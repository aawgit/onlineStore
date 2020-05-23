import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import {
	API_ITEMS_SHOW,
	API_ITEMS_CREATE,
	CURRENCY_PRE,
	CURRENCY_POST,
} from '../constants';
import Context from '../Context';

class AddItem extends Component {
	constructor(props) {
		super(props);
		this.state = {
			redirect: false,
		};
		this.onSubmit = this.onSubmit.bind(this);
	}

	static contextType = Context;

	componentDidMount() {
		if (!this.context.user) this.setState({ redirect: '/login' });
	}

	onSubmit(e) {
		const data = new FormData(document.getElementById('addItemForm'));
		data.append('id', this.context.user.id);
		e.preventDefault();
		axios
			.post(API_ITEMS_CREATE, data, {
				headers: {
					'x-access-token': this.context.user.token,
				},
			})
			.then((res) => {
				this.context.setItem(res.data);
				this.setState({ redirect: API_ITEMS_SHOW + res.data.id });
			})
			.catch((err) => this.context.setError(err));
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
										action='/api/items/create'
										method='post'
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
										/>
										&nbsp;{CURRENCY_POST}
										<br />
										<input
											type='file'
											name='image'
											accept='image/*'
											id='file'
										/>
										<input
											className='btn btn-lg btn-success btn-block'
											onClick={this.onSubmit}
											type='submit'
											value='Add Item'
										/>
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
