import React from 'react';
import { shallow } from 'enzyme';
import axios from 'axios';
import { API_PATH_ITEMS } from '../constants';
import ShowItems from './ShowItems';

jest.mock('axios');

const restoreCDM = ShowItems.prototype.componentDidMount;
const restoreGetItems = ShowItems.prototype.getItems;

describe('<ShowItems />', () => {
	let wrapper,
		mock_CDM = jest.fn(),
		mock_getItems = jest.fn(),
		mock_data = {
			item: {
				data: {
					_id: 'itemId',
					name: 'name1',
					description: 'desc1',
					price: 'price1',
					imageLocation: 'img1',
				},
				owner: {
					name: 'owner1',
					id: 'ownerId1',
				},
			},
		};

	beforeEach(() => {
		ShowItems.prototype.componentDidMount = mock_CDM;
		ShowItems.prototype.getItems = mock_getItems;
		sessionStorage.setItem('user', JSON.stringify({ jwtToken: 'token1' }));
	});

	it('should render', () => {
		wrapper = shallow(<ShowItems />);
		expect(wrapper.find('.container')).toHaveLength(1);
	});

	describe('componentDidMount', () => {
		beforeEach(() => {});

		it('should have been called', () => {
			wrapper = shallow(<ShowItems />);
			expect(mock_CDM).toHaveBeenCalled();
		});

		describe('conditional rendering', () => {
			beforeEach(() => {
				ShowItems.prototype.componentDidMount = restoreCDM;
			});

			it('should render contact link', () => {
				sessionStorage.removeItem('user');
				wrapper = shallow(<ShowItems />);
				wrapper.setState(mock_data);
				expect(
					wrapper.find('#action').childAt(0).contains('Contact the seller')
				).toBeTruthy();
			});

			it('should render actions', () => {
				wrapper = shallow(<ShowItems />);
				wrapper.setState(mock_data);
				expect(
					wrapper.find('#action').find('Link').contains('Edit')
				).toBeTruthy();
				expect(
					wrapper.find('#action').find('button').contains('Delete')
				).toBeTruthy();
				expect(wrapper.state().otions).not.toEqual('');
			});
		});
	});

	describe('getItems', () => {
		beforeEach(() => {
			ShowItems.prototype.getItems = restoreGetItems;
		});

		it('should resolve', async () => {
			axios.get.mockImplementation(() => Promise.resolve(mock_data.item));
			wrapper = shallow(<ShowItems />);
			wrapper.setProps({ match: { params: { id: 'mockId' } } });
			wrapper
				.instance()
				.getItems()
				.then(() => {
					expect(wrapper.state().item).toEqual(mock_data.item);
				});
			expect(axios.get).toHaveBeenCalledWith(API_PATH_ITEMS + '/mockId');
		});

		it('should reject', async () => {
			axios.get.mockImplementation(() => Promise.reject('error1'));
			wrapper = shallow(<ShowItems />);
			wrapper.setProps({ match: { params: { id: 'mockId' } } });
			wrapper
				.instance()
				.getItems()
				.catch((response) => expect(response).toEqual(new Error('error1')));
		});
	});

	describe('onDelete', () => {
		let mock_header;
		beforeEach(() => {
			mock_header = {
				headers: {
					'x-access-token': 'token1',
				},
			};
		});
		it('should resolve', async () => {
			axios.delete.mockImplementation(() => Promise.resolve({}));
			wrapper = shallow(<ShowItems />);
			wrapper.setState(mock_data);
			wrapper
				.instance()
				.onDelete({ preventDefault: jest.fn() })
				.then(() => {
					expect(wrapper.state().redirect).toEqual('/items');
				});
			expect(axios.delete).toHaveBeenCalledWith(
				API_PATH_ITEMS + '/' + mock_data.item.data._id,
				mock_header
			);
		});

		it('should reject', async () => {
			axios.delete.mockImplementation(() => Promise.reject('error1'));
			wrapper = shallow(<ShowItems />);
			wrapper.setProps({ match: { params: { id: 'mockId' } } });
			wrapper
				.instance()
				.onDelete({ preventDefault: jest.fn() })
				.catch((response) => expect(response).toEqual(new Error('error1')));
		});
	});
});
