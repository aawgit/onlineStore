import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_PATH_ITEMS, CURRENCY_PRE, CURRENCY_POST } from '../constants';

class ShowItem extends Component {
	constructor(props) {
		super(props);
		this.state = {
			options: '',
			item: {
				data: {},
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

		axios
			.get(API_PATH_ITEMS + '/' + this.props.match.params.id)
			.then((res) => this.setState({ item: { data: res.data } }))
			.catch((err) => console.log(err));

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

	onDelete(e) {
		e.preventDefault();

		axios
			.delete(API_PATH_ITEMS + '/' + this.state._id, {
				headers: {
					'x-access-token': JSON.parse(sessionStorage.getItem('user')).jwtToken,
				},
			})
			.then(() => this.setState({ redirect: '/items' }))
			.catch((err) => console.log(err.response.data));
	}

	render() {
		const { item, options } = this.state;
		return (
			<div className='container'>
				<div className='row'>
					{this.state.data && (
						<>
							<div className='col-sm-9 col-md-6 col-lg-5'>
								<div className='card card-signin my-5'>
									<img
										alt='Item'
										src={this.props.imageLocation}
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
											{CURRENCY_PRE}&nbsp;{item.price}&nbsp;{CURRENCY_POST}
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

export default ShowItem;
