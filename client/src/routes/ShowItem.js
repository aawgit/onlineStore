import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import Context from '../Context';
import {
	API_ITEMS_SHOW,
	API_ITEMS_DELETE,
	CURRENCY_PRE,
	CURRENCY_POST,
} from '../constants';

class ShowItems extends Component {
	constructor(props) {
		super(props);
		this.state = {
			redirect: false,
			options: '',
			item: {
				_id: '',
				name: '',
				owner: '',
				description: '',
				image: '',
				price: '',
			},
		};
		this.onDelete = this.onDelete.bind(this);
	}

	static contextType = Context;

	componentDidMount() {
		this.getItems().then(() => {
			const userActions = (
				<>
					<Link
						id='editLink'
						to={'/items/edit/' + this.state.item._id}
						className='btn btn-lg btn-secondary btn-block'
					>
						Edit
					</Link>
					<button
						id='deleteLink'
						onClick={this.onDelete}
						className='btn btn-lg btn-danger btn-block'
					>
						Delete
					</button>
				</>
			);

			const guestActions = (
				<a
					className='btn btn-lg btn-primary btn-block'
					href={`mailto:${this.state.item.owner}`}
				>
					Contact the seller
				</a>
			);

			this.setState({
				options:
					this.context.user._id === this.state.item.owner
						? userActions
						: guestActions,
			});
		});
	}

	getItems() {
		return axios
			.get(API_ITEMS_SHOW + this.props.match.params.id)
			.then((res) => this.setState({ item: res.data }))
			.catch((err) => {
				this.context.setError(err);
			});
	}

	onDelete(e) {
		e.preventDefault();

		return axios
			.delete(API_ITEMS_DELETE + this.state.item.public_id, {
				headers: {
					'x-access-token': this.context.user.token,
				},
			})
			.then(() => this.setState({ redirect: '/items' }))
			.catch((err) => {
				this.context.setError(err);
			});
	}

	render() {
		if (this.state.redirect) return <Redirect to={this.state.redirect} />;
		else {
			return (
				<div className='container'>
					<div className='row'>
						{this.state.item && (
							<>
								<div className='col-sm-9 col-md-6 col-lg-5'>
									<div className='card card-signin my-5'>
										<img
											alt='Item'
											src={this.state.item.image}
											className='card-img-top-new'
										/>
									</div>
								</div>
								<div className='col-sm-9 col-md-6 col-lg-5'>
									<div className='card card-signin my-5'>
										<div className='card-body'>
											<h5 className='card-title text-center'>
												{this.state.item.name}
											</h5>
											<label>{this.state.item.description}</label>
											<br />
											<label>
												{CURRENCY_PRE}&nbsp;{this.state.item.price}&nbsp;
												{CURRENCY_POST}
											</label>
											<br />
											<label>
												{' '}
												From <span />
												{this.state.item.owner}
											</label>
											<br />
											<br />
											<div id='action'>{this.state.options}</div>
										</div>
									</div>
								</div>
							</>
						)}
					</div>
				</div>
			);
		}
	}
}

export default ShowItems;
