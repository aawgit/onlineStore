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

	async getItems() {
		try {
			const res = await axios.get(API_ITEMS_SHOW);
			this.context.setItem(res.data);
			this.setState({ items: res.data });
		} catch (error) {
			return this.context.setError(error);
		}
	}

	render() {
		return (
			<div>
				<main role='main'>
					<div className='album py-5 bg-light'>
						<div className='container'>
							<div className='row'>
								{this.state.items.map((item, i) => (
									<div className='col-md-4' key={item.name + i}>
										<div
											className='card mb-4 shadow-sm p-4'
											style={{ minHeight: '600px' }}
										>
											<h5 className='mb-auto'>{item.name}</h5>
											<Link
												to={'/items/show/' + item.public_id}
												className='mt-5 mx-auto'
											>
												<img
													src={item.image}
													style={{ maxWidth: '250px', maxHeight: '250px' }}
													alt={item.name}
												/>
											</Link>
											<div className='card-body d-flex flex-column mt-auto'>
												<p className='card-text'>
													<span>{item.description}</span>
													<span className='d-block mt-auto'>
														{CURRENCY_PRE + item.price + CURRENCY_POST}
													</span>
												</p>
												<div className='mt-auto'>
													<Link
														to={'/items/show/' + item.public_id}
														className='btn btn-sm btn-outline-info btn-block p-4'
													>
														View
													</Link>
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
