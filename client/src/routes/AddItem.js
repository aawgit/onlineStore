import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import {
	API_ITEMS_CREATE,
	CURRENCY_PRE,
	CURRENCY_POST,
	API_ITEMS_SHOW,
} from '../constants';
import Context from '../Context';

class AddItem extends Component {
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
		this.openWidget = this.openWidget.bind(this);
	}

	static contextType = Context;

	// context mocked
	/* istanbul ignore next */
	componentDidMount() {
		if (!this.context.user) this.setState({ redirect: '/login' });
	}

	onValueChange(e) {
		const item = { ...this.state.item };
		item[e.target.name] = e.target.value;
		this.setState({ item });
	}

	onSubmit(e) {
		e.preventDefault();
		return axios
			.post(API_ITEMS_CREATE, this.state.item, {
				headers: {
					'x-access-token': this.context.user.token,
				},
			})
			.then((res) => {
				this.setState({ redirect: API_ITEMS_SHOW + res.data._id });
			})
			.catch((err) => {
				this.context.setError(err);
			});
	}

	openWidget() {
		return window.cloudinary
			.createUploadWidget(
				{
					cloudName: 'amatyas001',
					uploadPreset: 'os_upload',
				},
				(error, result) => {
					if (!error && result && result.event === 'success') {
						const item = { ...this.state.item };
						item.file = result.info;
						this.setState({ item });
					}
				}
			)
			.open();
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
										id='addItemForm'
										className='form-signin'
										encType='multipart/form-data'
									>
										<label htmlFor='name' className='sr-only'>
											Name
										</label>
										<input
											type='text'
											id='name'
											className='form-control'
											placeholder='Item name'
											required
											autoFocus
											name='name'
											onChange={this.onValueChange}
										/>
										<br />
										<label htmlFor='description' className='sr-only'>
											Description
										</label>
										<input
											type='text'
											id='description'
											className='form-control'
											placeholder='Item description'
											required
											name='description'
											onChange={this.onValueChange}
										/>
										<br />
										<label htmlFor='price' className='sr-only'>
											Price&nbsp;{CURRENCY_PRE}
										</label>
										<input
											type='text'
											id='price'
											className='form-control'
											placeholder='Item price'
											required
											name='price'
											onChange={this.onValueChange}
										/>
										&nbsp;{CURRENCY_POST}
										<br />
										<button
											className='btn btn-lg btn-primary btn-block'
											onClick={this.openWidget}
										>
											Upload Image
										</button>
										<button
											className='btn btn-lg btn-success btn-block'
											onClick={this.onSubmit}
										>
											Add item
										</button>
										{JSON.stringify(this.state)}
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

export default AddItem;
