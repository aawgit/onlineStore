import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Context from '../Context';
import { API_ITEMS_SHOW, CURRENCY_PRE, CURRENCY_POST } from '../constants';

class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			items: [],
		};
	}

	static contextType = Context;

	componentDidMount() {
		this.getItems();
	}

	getItems() {
		return axios
			.get(API_ITEMS_SHOW)
			.then((response) => {
				this.setState({
					items: response.data || [],
				});
			})
			.catch((error) => {
				this.context.setError(error);
			});
	}

	render() {
		const { items } = this.state;
		return (
			<div>
				<main role='main'>
					<div className='album py-5 bg-light'>
						<div className='container'>
							<div className='row'>
								{items.map((item, i) => (
									<div className='col-md-4' key={item.name + i}>
										<div className='card mb-4 shadow-sm'>
											<Link
												to={'/items/' + item._id}
												className='card-img-top-new'
											>
												<img
													src={item.image}
													className='card-img-top-new'
													alt={item.name}
												/>
											</Link>
											<div className='card-body'>
												<h5>{item.name}</h5>
												<br />
												<p className='card-text'>
													{item.description}
													<br />
													{CURRENCY_PRE + item.price + CURRENCY_POST}
													<br />
												</p>
												<div className='d-flex justify-content-between align-items-center'>
													<div className='btn-group'>
														<Link
															to={'/items/show/' + item._id}
															className='btn btn-sm btn-outline-secondary'
														>
															View
														</Link>
													</div>
												</div>
											</div>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</main>
			</div>
		);
	}
}
export default Home;
