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
		};
		this.onDelete = this.onDelete.bind(this);
	}

	static contextType = Context;

	componentDidMount() {
		this.getItems();
		const userActions = (
			<>
				<Link
					id='editLink'
					to={'/items/edit/' + this.props.match.params.id}
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
			<a className='btn btn-lg btn-primary btn-block' href='#/'>
				Contact the seller
			</a>
		);

		this.setState({
			options:
				this.context.user && this.context.user._id === this.context.item.owner
					? userActions
					: guestActions,
		});
	}

	getItems() {
		if (!sessionStorage.getItem('item')) {
			return axios
				.get(API_ITEMS_SHOW + this.props.match.params.id)
				.then((res) => this.context.setItem(res.data))
				.catch((err) => this.context.setError(err));
		}
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
					{this.context.item &&
						this.context.item.map((item, i) => (
							<div className='row' key={i}>
								<>
									<Link
										to={'/items'}
										className='btn btn-lg btn-outline-warning btn-block'
									>
										Go Back
									</Link>
									<div className='col-sm-9 col-md-6 col-lg-5'>
										<div className='card card-signin my-5'>
											<img
												alt='Item'
												src={item.image}
												className='card-img-top-new'
											/>
										</div>
									</div>
									<div className='col-sm-9 col-md-6 col-lg-5'>
										<div className='card card-signin my-5'>
											<div className='card-body'>
												<h5 className='card-title text-center'>{item.name}</h5>
												<label>{item.description}</label>
												<br />
												<label>
													{CURRENCY_PRE}&nbsp;{item.price}&nbsp;
													{CURRENCY_POST}
												</label>
												<br />
												<label>
													{' '}
													From <span />
													{item.owner.name}
												</label>
												<br />
												<br />
												<div id='action'>{this.state.options}</div>
											</div>
										</div>
									</div>
								</>
							</div>
						))}
				</div>
			);
		}
	}
}

export default ShowItems;
