import React, { Component } from 'react';
import { API_PATH_REGISTER } from '../constants';
import axios from 'axios';

class RegisterFormComp extends Component {
	constructor(props) {
		super(props);
		this.state = {
			message: false,
			user: {
				firstName: '',
				lastName: '',
				email: '',
				password: '',
			},
		};
		this.onValuChange = this.onValuChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	onValuChange(e) {
		this.setState({ user: { [e.target.name]: e.target.value } });
	}

	onSubmit(e) {
		e.preventDefault();

		const user = {
			name: this.state.user.firstName + ' ' + this.state.user.lastName,
			email: this.state.user.email,
			password: this.state.user.password,
		};

		axios
			.post(API_PATH_REGISTER, user)
			.then((res) => {
				this.setState({
					message: `Verification e-mail has been sent to ${res.data}.`,
				});
			})
			.catch((err) => {
				console.log(err.response.data);
			});
	}

	render() {
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
										onChange={this.onValuChange}
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
										onChange={this.onValuChange}
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
										onChange={this.onValuChange}
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
										onChange={this.onValuChange}
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

export default RegisterFormComp;
