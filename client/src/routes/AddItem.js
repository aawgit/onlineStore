import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';
import { API_ITEMS_CREATE, CURRENCY_PRE, CURRENCY_POST } from '../constants';
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

	async onSubmit(e) {
		const data = new FormData(document.getElementById('addItemForm'));
		data.append('id', this.context.user.id);
		e.preventDefault();
		try {
			const res = await axios.post(API_ITEMS_CREATE, data, {
				headers: {
					'x-access-token': this.context.user.token,
				},
			});
			this.context.setItem([...this.context.item, res.data]);
			this.setState({ redirect: '/items/show/' + res.data.public_id });
		} catch (err) {
			return this.context.setError(err);
		}
	}

	render() {
		if (this.state.redirect) {
			return <Redirect to={this.state.redirect} />;
		} else {
			return (
				<div className='container'>
					<Link
						to={'/items'}
						style={{ minWidth: '150px' }}
						className='btn btn-lg btn-outline-dark'
					>
						Back to the store
					</Link>
					<div className='row'>
						<div className='col-sm-9 col-md-7 col-lg-5 mx-auto'>
							<div className='card card-signin my-5'>
								<div className='card-body'>
									<h5 className='card-title text-center text-uppercase'>
										Create a new item in the store
									</h5>
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
											placeholder='Enter desired name'
											required
											autoFocus
											name='name'
										/>
										<br />
										<label htmlFor='description' className='sr-only'>
											Description
										</label>
										<textarea
											id='description'
											className='form-control'
											placeholder='Provide a short definitive description'
											required
											name='description'
											rows='6'
										></textarea>
										<br />
										<label htmlFor='price' className='sr-only'>
											Price
										</label>
										<input
											type='number'
											min='1'
											id='price'
											className='form-control'
											placeholder={CURRENCY_PRE}
											required
											name='price'
										/>
										&nbsp;{CURRENCY_POST}
										<br />
										{/* this seems hacky and wont work with keyboard */}
										<div
											className='editFileButtonWrapper'
											style={{ width: '100%' }}
										>
											<button
												className='btn btn-block btn-outline-info'
												id='editFileButton'
												aria-hidden='true'
											>
												Click here to add image
											</button>
											<input
												onMouseEnter={() => {
													document
														.getElementById('editFileButton')
														.classList.add('btn-info');
												}}
												onMouseLeave={() =>
													document
														.getElementById('editFileButton')
														.classList.remove('btn-info')
												}
												style={{ width: '100%' }}
												type='file'
												name='image'
												accept='image/*'
											/>
										</div>
										<span className='d-block text-muted'>
											<em>
												<strong>Important note:</strong> The uploaded files are
												transfered to the Cloudiary storage and served as public
												to anyone. For more information{' '}
												<a
													href='https://cloudinary.com/'
													target='_blank'
													rel='noopener noreferrer'
												>
													visit the Cloudiary homepage
												</a>{' '}
											</em>
										</span>
										<input
											className='btn btn-lg btn-success btn-block mt-4'
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
