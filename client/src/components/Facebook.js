import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import FacebookLogin from 'react-facebook-login';

export const API_PATH = '/api/auth/facebook/login';

class Facebook extends Component {
	constructor(props, context) {
		super(props, context);
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

	onLoginSuccess() {
		axios
			.post(API_PATH, {
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
					redirect: true,
				});
			})
			.catch((err) => console.log(err));
	}

	responseFacebook(response) {
		if (response.accessToken) {
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

	render() {
		if (this.state.redirect) {
			return <Redirect to='/' />;
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
