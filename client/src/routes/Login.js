import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { Facebook } from '../components';
import Context from '../Context';
import { API_PATH_LOGIN } from '../constants';

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			redirect: false,
			user: {},
		};
		this.onValuChange = this.onValuChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	static contextType = Context;

	componentDidMount() {
		if (this.context.user) this.setState({ redirect: '/shop' });
	}

	onValuChange(e) {
		this.setState({ user: { [e.target.name]: e.target.value } });
	}

	onSubmit(e) {
		e.preventDefault();
		return axios
			.post(API_PATH_LOGIN, this.state.user)
			.then((res) => {
				this.context.setUser(res.data);
				this.setState({ redirect: '/shop' });
			})
			.catch((err) => {
				this.context.setError(err);
			});
	}

	render() {
		if (this.state.redirect) {
			return <Redirect to={this.state.redirect} />;
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
										<div className='text-center'>
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

export default Login;
