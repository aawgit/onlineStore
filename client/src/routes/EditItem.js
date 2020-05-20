import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import Context from '../Context';
import { API_PATH_ITEMS } from '../constants';

class EditItem extends Component {
	constructor(props) {
		super(props);
		this.state = {
			redirect: false,
			item: {
				name: '',
				description: '',
				price: '',
			},
		};
		this.onValueChange = this.onValueChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	static contextType = Context;

	// context mocked
	/* istanbul ignore next */
	componentDidMount() {
		if (!this.context.user) this.setState({ redirect: '/login' });
		this.getItems();
	}

	getItems() {
		return axios.get(API_PATH_ITEMS + '/' + this.props.match.params.id).then(
			(res) => this.setState({ item: res.data }),
			(err) => {
				this.context.setError(err);
			}
		);
	}

	onValueChange(e) {
		this.setState({ item: { [e.target.name]: e.target.value } });
	}

	onSubmit(e) {
		e.preventDefault();

		return axios
			.put(API_PATH_ITEMS + '/' + this.props.match.params.id, this.state.item, {
				headers: {
					'x-access-token': this.context.user.token,
				},
			})
			.then((res) => this.setState({ redirect: '/viewItem/' + res.data._id }))
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
									<h5 className='card-title text-center'>Edit item</h5>
									<form className='form-signin'>
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
											value={this.state.item.name}
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
											value={this.state.item.description}
										/>
										<br />
										<label htmlFor='price' className='sr-only'>
											Price
										</label>
										<input
											type='text'
											id='price'
											className='form-control'
											placeholder='Item price'
											required
											name='price'
											onChange={this.onValueChange}
											value={this.state.item.price}
										/>
										<br />

										<button
											className='btn btn-lg btn-primary btn-block'
											type='submit'
											onClick={this.onSubmit}
										>
											Save changes
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

export default EditItem;
