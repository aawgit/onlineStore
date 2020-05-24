import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import Context from '../Context';
import { API_PATH_REGISTER } from '../constants';

class Register extends Component {
	constructor(props) {
		super(props);
		this.state = {
			message: false,
			redirect: false,
			user: {
				firstName: '',
				lastName: '',
				email: '',
				password: '',
			},
		};
		this.onValueChange = this.onValueChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	static contextType = Context;

	componentDidMount() {
		if (this.context.user) this.setState({ redirect: '/shop' });
	}

	onValueChange(e) {
		const user = { ...this.state.user };
		user[e.target.name] = e.target.value;
		this.setState({ user });
	}

	onSubmit(e) {
		e.preventDefault();

		const user = {
			name: this.state.user.firstName + ' ' + this.state.user.lastName,
			email: this.state.user.email,
			password: this.state.user.password,
		};

		return axios
			.post(API_PATH_REGISTER, user)
			.then((res) => {
				this.context.setUser(this.state.user);
				this.setState({
					message: `Verification e-mail has been sent to ${this.state.user.email}.`,
				});
			})
			.catch((err) => {
				this.context.setError(err);
			});
	}

	render() {
		if (this.state.redirect) return <Redirect to='/' />;
		else {
			return (
				<div className='container'>
					<div className='row'>
						<div className='col-sm-9 col-md-7 col-lg-5 mx-auto'>
							<div className='card card-signin my-5'>
								<div className='card-body'>
									<h5 className='card-title text-center'>Register</h5>
									<form className='form-signin' onSubmit={this.onSubmit}>
										<label htmlFor='firstName' className='sr-only'>
											First name
										</label>
										<input
											type='text'
											id='firstName'
											className='form-control'
											placeholder='First name'
											required
											autoFocus
											onChange={this.onValueChange}
											name='firstName'
										/>
										<br />
										<label htmlFor='lastName' className='sr-only'>
											Last name
										</label>
										<input
											type='text'
											id='lastName'
											className='form-control'
											placeholder='LastName'
											required
											onChange={this.onValueChange}
											name='lastName'
										/>
										<br />
										<label htmlFor='email' className='sr-only'>
											Email address
										</label>
										<input
											type='email'
											id='email'
											className='form-control'
											name='email'
											placeholder='Email address'
											required
											onChange={this.onValueChange}
										/>
										<br />
										<label htmlFor='password' className='sr-only'>
											Password
										</label>
										<input
											type='password'
											id='password'
											className='form-control'
											placeholder='Password'
											name='password'
											required
											onChange={this.onValueChange}
										/>
										<br />

										<button
											className='btn btn-lg btn-primary btn-block'
											type='submit'
										>
											Register
										</button>
										<br />
										<div id='message'>{this.state.message}</div>
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

export default Register;
