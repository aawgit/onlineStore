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
import { ItemEditor, Confirmation } from '../components';

class ShowItems extends Component {
	constructor(props) {
		super(props);
		this.state = {
			redirect: false,
			options: '',
			edit: false,
			delete: false,
			item: {
				owner: {}, // perevent error or initial render
			},
		};
		this.onDelete = this.onDelete.bind(this);
	}

	static contextType = Context;

	componentDidMount() {
		this.getItem().then(() => {
			this.setState({
				item: this.context.item.filter(
					(item) => item.public_id === this.props.match.params.id
				)[0],
				options:
					this.context.user &&
					this.context.user._id === this.context.item.owner ? (
						<div className='btn-group btn-group-lg'>
							<button
								id='deleteLink'
								onClick={() => this.setState({ delete: true })}
								style={{ minWidth: '150px' }}
								className='btn btn-lg btn-outline-danger'
							>
								Delete
							</button>
							<button
								onClick={() => this.setState({ edit: true })}
								style={{ minWidth: '150px' }}
								className='btn btn-lg btn-info'
							>
								Edit
							</button>
						</div>
					) : (
						<a className='btn btn-lg btn-outline-info' href='#/'>
							Contact the seller
						</a>
					),
			});
		});
	}

	// allow users to use direct link
	async getItem() {
		if (!this.context.item) {
			try {
				const res = await axios.get(API_ITEMS_SHOW);
				return this.context.setItem(res.data);
			} catch (err) {
				return this.context.setError(err);
			}
		}
	}

	async onDelete(e) {
		e.preventDefault();
		try {
			await axios.delete(API_ITEMS_DELETE + this.state.item.public_id, {
				headers: {
					'x-access-token': this.context.user.token,
				},
			});
			return this.setState({ redirect: '/items' });
		} catch (err) {
			this.context.setError(err);
		}
	}

	render() {
		if (this.state.redirect) return <Redirect to={this.state.redirect} />;
		else {
			return (
				<div className='container' id='showContainer'>
					{this.state.item && (
						<>
							{!this.state.delete && ( // hide options row when waiting for delete confirmation
								<div className='row'>
									<Link
										to={'/items'}
										style={{ minWidth: '150px' }}
										className='btn btn-lg btn-outline-dark'
									>
										Back to the store
									</Link>
									<div id='action' className='ml-auto'>
										{this.state.edit ? (
											<button
												onClick={() => this.setState({ edit: false })}
												style={{ minWidth: '150px' }}
												className='btn btn-lg btn-outline-danger btn-block'
											>
												Cancel
											</button>
										) : (
											this.state.options
										)}
									</div>
								</div>
							)}
							{this.state.delete && (
								<Confirmation
									action='permanently delete'
									subject={this.state.item.name}
									confirm={() => {}}
									cancel={() => this.setState({ delete: false })}
								/>
							)}
							<div className='row'>
								<div className='col-sm-9 col-md-6 col-lg-5'>
									<div className='card card-signin my-5'>
										<img
											alt='Item'
											src={this.state.item.image}
											style={{ maxWidth: '400px', height: 'auto' }}
											className='m-3'
										/>
									</div>
								</div>
								<div className='col-sm-9 col-md-6 col-lg-5'>
									<div
										className='card card-signin my-5'
										style={{ minHeight: '600px' }}
									>
										<div className='card-body'>
											{this.state.edit === true ? (
												<ItemEditor item={this.state.item} />
											) : (
												<div className='d-flex flex-column'>
													<h3 className='card-title text-center mx-3'>
														{this.state.item.name}
													</h3>
													<span className='align-self-end'>
														<em>From&nbsp;{this.state.item.owner.name}</em>
													</span>
													<span className='mt-auto display-4'>
														{CURRENCY_PRE}
														{this.state.item.price}
														{CURRENCY_POST}
													</span>
													<span className='mt-3'>
														{this.state.item.description}
													</span>
												</div>
											)}
										</div>
									</div>
								</div>
							</div>
						</>
					)}
				</div>
			);
		}
	}
}

export default ShowItems;
