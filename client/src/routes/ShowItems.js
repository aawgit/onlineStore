import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_PATH_ITEMS, CURRENCY_PRE, CURRENCY_POST } from '../constants';

class ShowItems extends Component {
	constructor(props) {
		super(props);
		this.state = {
			redirect: false,
			options: '',
			item: {
				data: false,
				owner: {
					name: '',
					id: '',
				},
			},
		};
		this.onDelete = this.onDelete.bind(this);
	}

	componentDidMount() {
		const user = JSON.parse(sessionStorage.getItem('user'));
		this.getItems();
		const { item } = this.state;
		this.setState({
			options:
				user && user.userId === item.owner._id ? (
					<>
						<Link
							to={'/editItem/' + item._id}
							className='btn btn-lg btn-secondary btn-block'
						>
							Edit
						</Link>
						<button
							onClick={this.onDelete}
							className='btn btn-lg btn-danger btn-block'
						>
							Delete
						</button>
					</>
				) : (
					<a
						className='btn btn-lg btn-primary btn-block'
						href={`mailto:${this.state.item.owner.email}`}
					>
						Contact the seller
					</a>
				),
		});
	}

	getItems() {
		return axios
			.get(API_PATH_ITEMS + '/' + this.props.match.params.id)
			.then((res) => this.setState({ item: res }))
			.catch((err) => {
				throw new Error(err);
			});
	}

	onDelete(e) {
		e.preventDefault();

		return axios
			.delete(API_PATH_ITEMS + '/' + this.state.item.data._id, {
				headers: {
					'x-access-token': JSON.parse(sessionStorage.getItem('user')).jwtToken,
				},
			})
			.then(() => this.setState({ redirect: '/items' }))
			.catch((err) => {
				throw new Error(err);
			});
	}

	render() {
		const { item, options } = this.state;
		return (
			<div className='container'>
				<div className='row'>
					{item.data && (
						<>
							<div className='col-sm-9 col-md-6 col-lg-5'>
								<div className='card card-signin my-5'>
									<img
										alt='Item'
										src={item.data.imageLocation}
										className='card-img-top-new'
									/>
								</div>
							</div>
							<div className='col-sm-9 col-md-6 col-lg-5'>
								<div className='card card-signin my-5'>
									<div className='card-body'>
										<h5 className='card-title text-center'>{item.data.name}</h5>
										<label>{item.data.description}</label>
										<br />
										<label>
											{CURRENCY_PRE}&nbsp;{item.data.price}&nbsp;{CURRENCY_POST}
										</label>
										<br />
										<label>
											{' '}
											From <span />
											{item.owner.name}
										</label>
										<br />
										<br />
										<div id='action'>{options}</div>
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

export default ShowItems;
