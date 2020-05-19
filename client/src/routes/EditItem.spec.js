import React from 'react';
import { shallow } from 'enzyme';
import axios from 'axios';
import EditItem from './EditItem';
import { checkLoggedIn } from '../utils/LogInHandler';
import { API_PATH_ITEMS } from '../constants';

jest.mock('axios');
jest.mock('../utils/LogInHandler');

const restoreCDM = EditItem.prototype.componentDidMount;
const restoreGetItems = EditItem.prototype.getItems;

describe('<EditItem />', () => {
	let wrapper,
		mock_login = true,
		mock_CDM = jest.fn(),
		mock_getItems = jest.fn();

	beforeEach(() => {
		EditItem.prototype.componentDidMount = mock_CDM;
		EditItem.prototype.getItems = mock_getItems;
		checkLoggedIn.mockImplementationOnce(() => mock_login);
	});

	describe('componentDidMount', () => {
		it('should have been called', () => {
			wrapper = shallow(<EditItem />);
			expect(mock_CDM).toHaveBeenCalledTimes(1);
		});

		it('should call checkLoggedIn', () => {
			EditItem.prototype.componentDidMount = restoreCDM;
			wrapper = shallow(<EditItem />);
			expect(wrapper.find('.container')).toHaveLength(1);
			expect(checkLoggedIn).toHaveBeenCalledTimes(1);
		});

		it('should set redirect to state', () => {
			EditItem.prototype.componentDidMount = restoreCDM;
			mock_login = false;
			wrapper = shallow(<EditItem />);
			expect(wrapper.state().redirect).toEqual('/login');
		});
	});

	describe('getItems', () => {
		let mock_data;

		beforeEach(() => {
			EditItem.prototype.getItems = restoreGetItems;
			mock_data = {
				data: {
					name: 'name1',
					description: 'desc1',
					price: 'price1',
				},
			};
		});
		it('should resolve', async () => {
			axios.get.mockImplementation(() => Promise.resolve(mock_data));
			wrapper = shallow(<EditItem />);
			wrapper.setProps({ match: { params: { id: 'mockId' } } });
			wrapper
				.instance()
				.getItems()
				.then(() => {
					expect(wrapper.state().item).toEqual(mock_data.data);
				});
			expect(axios.get).toHaveBeenCalledWith(API_PATH_ITEMS + '/mockId');
		});

		it('should reject', async () => {
			axios.get.mockImplementation(() => Promise.reject('error1'));
			wrapper = shallow(<EditItem />);
			wrapper.setProps({ match: { params: { id: 'mockId' } } });
			wrapper
				.instance()
				.getItems()
				.catch((response) => expect(response).toEqual(new Error('error1')));
		});
	});

	describe('onValueChange', () => {
		it('should set state', () => {
			wrapper = shallow(<EditItem />);
			wrapper
				.instance()
				.onValueChange({ target: { name: 'mock', value: 'mock1' } });
			expect(wrapper.state().item.mock).toEqual('mock1');
		});
	});

	describe('onSubmit', () => {
		let mock_data, mock_state, mock_header;

		beforeEach(() => {
			mock_state = {
				item: {
					name: 'name1',
					description: 'desc1',
					price: 'price1',
				},
			};
			mock_data = {
				data: {
					_id: 'mockId',
				},
				name: 'name1',
				description: 'desc1',
				price: 'price1',
			};
			mock_header = {
				headers: {
					'x-access-token': 'token1',
				},
			};
		});

		it('should resolve', async () => {
			sessionStorage.setItem('user', JSON.stringify({ jwtToken: 'token1' }));
			axios.put.mockImplementation(() => Promise.resolve(mock_data));
			wrapper = shallow(<EditItem />);
			wrapper.setState({ item: mock_state.item });
			wrapper.setProps({ match: { params: { id: 'mockId' } } });
			wrapper
				.instance()
				.onSubmit({ preventDefault: jest.fn() })
				.then(() =>
					expect(wrapper.state().redirect).toEqual('/viewItem/mockId')
				);
			expect(axios.put).toHaveBeenCalledWith(
				API_PATH_ITEMS + '/mockId',
				mock_state.item,
				mock_header
			);
		});

		it('should reject', async () => {
			axios.put.mockImplementation(() => Promise.reject('error1'));
			wrapper
				.instance()
				.onSubmit({ preventDefault: jest.fn() })
				.catch((response) => expect(response).toEqual(new Error('error1')));
		});
	});
});
