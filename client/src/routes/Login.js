import React, { Component } from 'react';
import axios from 'axios';
import { Redirect, Link } from 'react-router-dom';
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
		if (this.context.user) this.setState({ redirect: '/home' });
	}

	onValuChange(e) {
		const user = { ...this.state.user };
		user[e.target.name] = e.target.value;
		this.setState({ user });
	}

	onSubmit(e) {
		e.preventDefault();
		return axios
			.post(API_PATH_LOGIN, this.state.user)
			.then((res) => {
				this.context.setUser(res.data);
				this.setState({ redirect: '/home' });
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
											placeholder='johndoe@example.com'
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
												<input
													name='remember'
													type='checkbox'
													value='remember-me'
												/>{' '}
												Remember me
											</label>
										</div>
										<button
											className='btn btn-lg btn-dark btn-block'
											type='submit'
										>
											Sign in
										</button>
										<div className='text-center mt-3'>
											<Facebook />
										</div>
									</form>
								</div>
							</div>
							<p>
								Please login or <Link to='/register'>register</Link> to enjoy
								our service at maximum. This gives you access to our uploading
								platform and you can make offers with others on this website. If
								you need support or legal information, refer to our{' '}
								<Link to='/contact'>contact</Link> page!
								<br />
								Thank you for your trust!
							</p>
							<p className='text-center'>
								<em>The {process.env.REACT_APP_NAME} Team</em>
							</p>
						</div>
					</div>
				</div>
			);
		}
	}
}

export default Login;
