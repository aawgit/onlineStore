import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import FacebookLogin from 'react-facebook-login';
import Context from '../Context';
import { API_PATH_FACEBOOK } from '../constants';

class Facebook extends Component {
	constructor(props) {
		super(props);
		this.handleResponse = this.handleResponse.bind(this);
		this.state = {
			redirect: false,
		};
	}

	static contextType = Context;

	/**
	 * Callback method of the external Facebook component
	 * Getting fired when user closes the login prompt.
	 * See more: https://github.com/keppelen/react-facebook-login	 *
	 * @param {object} response Data sent back by the Facebook API
	 */
	handleResponse(response) {
		return axios
			.post(API_PATH_FACEBOOK, {
				access_token: response.accessToken,
			})
			.then((res) => {
				this.context.setUser(res.data);
				this.setState({ redirect: '/home' });
			})
			.catch((err) => {
				this.context.setError(err);
			});
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
