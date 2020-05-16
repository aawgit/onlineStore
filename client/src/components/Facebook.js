import React, { Component } from 'react';
import { Context } from '../App';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import FacebookLogin from 'react-facebook-login';

class Facebook extends Component {
	constructor(props) {
		super(props);
		this.state = {
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
	static contextType = Context;

	onLoginSuccess() {
		axios
			.post('/api/auth/facebook/login', {
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
				this.context.setUser(res.data.name);
				this.props.history.push('/');
			})
			.catch((err) => console.log(err.response.data));
	}

	responseFacebook(response) {
		if (response.accessToken) {
			this.setState({
				isLoggedIn: true,
				name: response.name,
				email: response.email,
				picture: response.picture.data.url,
				accessToken: response.accessToken,
			});
			this.onLoginSuccess();
		}
	}

	render() {
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

export default withRouter(Facebook);
