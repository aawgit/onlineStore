import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import Facebook from './Facebook';

export const API_PATH_LOGIN = '/api/auth/login';

class LoginFormComp extends Component {
	constructor(props) {
		super(props);
		this.state = {
			redirect: false,
			user: {},
		};
		this.onValuChange = this.onValuChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	onValuChange(e) {
		this.setState({ user: { [e.target.name]: e.target.value } });
	}

	onSubmit(e) {
		e.preventDefault();
		axios
			.post(API_PATH_LOGIN, this.state.user)
			.then((res) => {
				sessionStorage.setItem(
					'user',
					JSON.stringify({
						jwtToken: res.data.token,
						userId: res.data.userId,
						name: res.data.name,
					})
				);
				//TODO: set user to context
				this.setState({ redirect: true });
			})
			.catch((err) => console.log(err.response.data));
	}

	render() {
		if (this.state.redirect) {
			return <Redirect to='/' />;
		} else {
			return (
				<div className='container'>
					<div className='row'>
						<div className='col-sm-9 col-md-7 col-lg-5 mx-auto'>
							<div className='card card-signin my-5'>
								<div className='card-body'>
									<h5 className='card-title text-center'>Sign In</h5>
									<form className='form-signin' onSubmit={this.onSubmit}>
										<label htmlFor='email' className='sr-only'>
											Email address
										</label>
										<input
											type='email'
											id='inputEmail'
											className='form-control'
											placeholder='Email address'
											required
											autoFocus
											name='email'
											onChange={this.onValuChange}
										/>
										<br />
										<label htmlFor='password' className='sr-only'>
											Password
										</label>
										<input
											type='password'
											id='inputPassword'
											className='form-control'
											placeholder='Password'
											required
											name='password'
											onChange={this.onValuChange}
										/>
										<br />
										<div className='checkbox'>
											<label>
												<input type='checkbox' value='remember-me' /> Remember
												me
											</label>
										</div>
										<button
											className='btn btn-lg btn-primary btn-block'
											type='submit'
										>
											Sign in
										</button>
										{/*<button className="btn btn-lg btn-facebook btn-block text-uppercase">
                    <i className="fab fa-google mr-2" /> Sign in with Google
                    </button>*/}
										<div style={{ textAlign: 'center' }}>
											<p>Or</p>
											<Facebook />
										</div>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			);
		}
	}
}

export default LoginFormComp;
