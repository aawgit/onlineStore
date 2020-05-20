import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { API_PATH_ITEMS, CURRENCY_PRE, CURRENCY_POST } from '../constants';
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
	}

	static contextType = Context;

	// context mocked
	/* istanbul ignore next */
	componentDidMount() {
		if (!this.context.user) this.setState({ redirect: '/login' });
	}

	onValueChange(e) {
		switch (e.target.name) {
			case 'file':
				this.setState({ item: { file: e.target.files[0] } });
				break;
			default:
				this.setState({ item: { [e.target.name]: e.target.value } });
		}
	}

	onSubmit(e) {
		e.preventDefault();
		const formData = new FormData();
		Object.keys(this.state.item).forEach((key) =>
			formData.append(key, this.state.item[key])
		);

		return axios
			.post(API_PATH_ITEMS, formData, {
				headers: {
					'x-access-token': this.context.user.token,
				},
			})
			.then((res) => {
				this.setState({ redirect: '/viewItem/' + res.data._id });
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
									<h5 className='card-title text-center'>Add item</h5>
									<form className='form-signin' encType='multipart/form-data'>
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
										<input
											type='file'
											name='file'
											accept='image/*'
											id='file'
											onChange={this.onValueChange}
										/>
										<button
											className='btn btn-lg btn-primary btn-block'
											onClick={this.onSubmit}
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

export default AddItem;
