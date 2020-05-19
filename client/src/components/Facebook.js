import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import FacebookLogin from 'react-facebook-login';
import { API_PATH_FACEBOOK } from '../constants';

class Facebook extends Component {
	constructor(props) {
		super(props);
		this.state = {
			redirect: false,
			user: {
				isLoggedIn: false,
				name: '',
				email: '',
				picture: '',
				accessToken: '',
			},
		};
		this.onLoginSuccess = this.onLoginSuccess.bind(this);
		this.responseFacebook = this.responseFacebook.bind(this);
	}

	/**
	 * Chained callback from Facebook API to tokenize session
	 */
	onLoginSuccess() {
		return axios
			.post(API_PATH_FACEBOOK, {
				access_token: this.state.user.accessToken,
			})
			.then((res) => {
				sessionStorage.setItem(
					'user',
					JSON.stringify({
						jwtToken: res.data.token,
						userId: res.data.userId,
						name: res.data.name,
					})
				);
				this.setState({
					redirect: '/home',
				});
			})
			.catch((err) => {
				throw new Error(err);
			});
	}

	/**
	 * Callback method of the external Facebook component
	 * Getting fired when user closes the login prompt.
	 * See more: https://github.com/keppelen/react-facebook-login	 *
	 * @param {object} response Data sent back by the Facebook API
	 */
	responseFacebook(response) {
		if (response && response.hasOwnProperty('accessToken')) {
			this.setState({
				user: {
					isLoggedIn: true,
					name: response.name,
					email: response.email,
					picture: response.picture.data.url,
					accessToken: response.accessToken,
				},
			});
			this.onLoginSuccess();
		}
	}
	/**
	 * There is no need to test the render method itself because
	 * both components has it's own unit tests and the internal state
	 * is check elsewhere for this statement
	 */
	/* istanbul ignore next */
	render() {
		if (this.state.redirect) {
			return <Redirect to={this.state.redirect} />;
		} else {
			return (
				<FacebookLogin
					appId='1343346045860132'
					autoLoad={false}
					fields='name,email,picture'
					onClick={() => {}}
					callback={this.responseFacebook}
				/>
			);
		}
	}
}

export default Facebook;
