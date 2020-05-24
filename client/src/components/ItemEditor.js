import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import Context from '../Context';
import { API_ITEMS_EDIT } from '../constants';

class EditItem extends Component {
	constructor(props) {
		super(props);
		this.state = {
			redirect: false,
		};
		this.onSubmit = this.onSubmit.bind(this);
	}

	static contextType = Context;

	async onSubmit(e) {
		e.preventDefault();
		const data = new FormData(document.getElementById('editItemForm'));
		data.append('id', this.context.user.id);
		try {
			const res = await axios.put(
				API_ITEMS_EDIT + this.props.item.public_id,
				data,
				{
					headers: {
						'x-access-token': this.context.user.token,
					},
				}
			);
			return this.setState({ redirect: '/items/show/' + res.data.public_id });
		} catch (err) {
			return this.context.setError(err);
		}
	}

	render() {
		if (this.state.redirect) return <Redirect to={this.state.redirect} />;
		else {
			return (
				<form
					id='editItemForm'
					className='form-signin'
					action='/api/items/edit'
					method='put'
					encType='multipart/form-data'
				>
					<h5 className='card-title text-center text-uppercase'>
						Edit the details of your item
					</h5>
					<label htmlFor='name' className='font-weight-bolder'>
						Enter a new name
					</label>
					<input
						type='text'
						id='name'
						className='form-control'
						placeholder='Item name'
						required
						autoFocus
						name='name'
						defaultValue={this.props.item.name}
					/>
					<br />
					<label htmlFor='description' className='font-weight-bolder'>
						Enter a new description
					</label>
					<textarea
						id='description'
						className='form-control'
						placeholder='Item description'
						required
						name='description'
						defaultValue={this.props.item.description}
						rows='6'
					></textarea>
					<br />
					<label htmlFor='price' className='font-weight-bolder'>
						Enter a new price
					</label>
					<input
						type='text'
						id='price'
						className='form-control'
						placeholder='Item price'
						required
						name='price'
						defaultValue={this.props.item.price}
					/>
					<br />
					{/* this seems hacky and wont work with keyboard */}
					<div className='editFileButtonWrapper' style={{ width: '100%' }}>
						<button
							className='btn btn-block btn-outline-info'
							id='editFileButton'
							aria-hidden='true'
						>
							Click here to change image
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
					<input
						className='btn btn-lg btn-success btn-block mt-3'
						onClick={this.onSubmit}
						type='submit'
						value='Apply Changes'
					/>
				</form>
			);
		}
	}
}

export default EditItem;
