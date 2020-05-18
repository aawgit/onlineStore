import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { API_PATH_ITEMS } from '../constants';
import { checkLoggedIn } from '../utils';

class AddItemComp extends Component {
	constructor(props) {
		super(props);
		this.state = {
			redirect: false,
			item: {
				name: '',
				description: '',
				price: '',
				file: '',
			},
		};
		this.onValueChange = this.onValueChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	componentDidMount() {
		if (!checkLoggedIn()) this.setState({ redirect: '/login' });
	}

	onValueChange(e) {
		switch (e.target.name) {
			case 'file':
				this.setState({ file: e.target.files[0] });
				break;
			default:
				this.setState({ [e.target.name]: e.target.value });
		}
	}

	onSubmit(e) {
		e.preventDefault();
		const formData = new FormData();
		const { name, description, price, file } = this.state.item;

		formData.append('name', name);
		formData.append('description', description);
		formData.append('price', price);
		formData.append('file', file);

		axios
			.post(API_PATH_ITEMS, formData, {
				headers: {
					'x-access-token': JSON.parse(sessionStorage.getItem('user')).jwtToken,
				},
			})
			.then((res) => {
				this.setState({ redirect: '/viewItem/' + res.data._id });
			})
			.catch((err) => console.log(err));
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
									<h5 className='card-title text-center'>Add item</h5>
									<form
										className='form-signin'
										onSubmit={this.onSubmit}
										enctype='multipart/form-data'
									>
										<label for='name' className='sr-only'>
											Name
										</label>
										<input
											type='text'
											id='name'
											className='form-control'
											placeholder='Item name'
											required
											autofocus
											name='name'
											onChange={this.onValueChange}
										/>
										<br />
										<label for='description' className='sr-only'>
											Description
										</label>
										<input
											type='text'
											id='description'
											className='form-control'
											placeholder='Item description'
											required
											autofocus
											name='description'
											onChange={this.onValueChange}
										/>
										<br />
										<label for='price' className='sr-only'>
											Price (LKR)
										</label>
										<input
											type='text'
											id='price'
											className='form-control'
											placeholder='Item price'
											required
											autofocus
											name='price'
											onChange={this.onValueChange}
										/>
										<br />
										<input
											type='file'
											name='file'
											accept='image/*'
											id='file'
											onChange={this.onValueChange}
										/>
										<button
											className='btn btn-lg btn-primary btn-block'
											type='submit'
										>
											Add item
										</button>
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

export default AddItemComp;
