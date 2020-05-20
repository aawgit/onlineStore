import React from 'react';
import { shallow, mount } from 'enzyme';
import Context from '../Context';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';
import { API_PATH_ITEMS } from '../constants';
import ShowItem from './ShowItem';

jest.mock('axios');

const restoreCDM = ShowItem.prototype.componentDidMount;
const restoreGetItems = ShowItem.prototype.getItems;

describe('<ShowItems />', () => {
	let wrapper,
		mock_context = {
			user: {
				_id: 'default',
				token: 'token1',
			},
			setError: jest.fn(),
		},
		mock_data = {
			data: {
				_id: 'itemId',
				name: 'name1',
				description: 'desc1',
				price: 'price1',
				imageLocation: 'img1',
			},
			owner: {
				name: 'owner1',
				_id: 'ownerId1',
			},
		},
		mock_CDM = jest.fn(),
		mock_getItems = jest.fn();

	beforeEach(() => {
		ShowItem.prototype.componentDidMount = mock_CDM;
		ShowItem.prototype.getItems = mock_getItems;
	});

	it('should render', () => {
		wrapper = shallow(<ShowItem />);
		expect(wrapper.find('.container')).toHaveLength(1);
	});

	describe('componentDidMount', () => {
		it('should have been called', () => {
			wrapper = shallow(<ShowItem />);
			expect(mock_CDM).toHaveBeenCalled();
		});

		describe('conditional rendering', async () => {
			beforeEach(() => {
				ShowItem.prototype.componentDidMount = restoreCDM;
			});

			it('should render contact link', () => {
				mock_context.user._id = 'mock';
				wrapper = mount(
					<MemoryRouter>
						<Context.Provider value={mock_context}>
							<ShowItem />
						</Context.Provider>
					</MemoryRouter>
				);
				wrapper = wrapper.childAt(0).childAt(0);
				wrapper.setState({ item: mock_data });
				expect(wrapper.children().text()).toContain('Contact the seller');
			});

			it('should render actions', () => {
				mock_context.user._id = 'default';
				wrapper = mount(
					<MemoryRouter>
						<Context.Provider value={mock_context}>
							<ShowItem />
						</Context.Provider>
					</MemoryRouter>
				);
				wrapper = wrapper.childAt(0).childAt(0);
				expect(wrapper.children().text()).toContain('Edit');
				expect(wrapper.children().text()).toContain('Delete');
			});
		});
	});

	describe('getItems', () => {
		beforeEach(() => {
			ShowItem.prototype.getItems = restoreGetItems;
		});

		it('should resolve', async () => {
			axios.get.mockImplementation(() => Promise.resolve(mock_data));
			wrapper = mount(
				<MemoryRouter>
					<Context.Provider value={mock_context}>
						<ShowItem match={{ params: { id: 'mockId' } }} />
					</Context.Provider>
				</MemoryRouter>
			);
			wrapper = wrapper.childAt(0).childAt(0);
			wrapper
				.instance()
				.getItems()
				.then(() => {
					expect(wrapper.state().item).toMatchObject(mock_data);
				});
			expect(axios.get).toHaveBeenCalledWith(API_PATH_ITEMS + '/mockId');
		});

		it('should reject', async () => {
			axios.get.mockImplementation(() => Promise.reject('error1'));
			wrapper = mount(
				<MemoryRouter>
					<Context.Provider value={mock_context}>
						<ShowItem match={{ params: { id: 'mockId' } }} />
					</Context.Provider>
				</MemoryRouter>
			);
			wrapper = wrapper.childAt(0).childAt(0);
			wrapper
				.instance()
				.getItems()
				.catch(() => expect(mock_context.setError).toHaveBeenCalled());
		});
	});

	describe('onDelete', () => {
		let mock_header;
		beforeEach(() => {
			mock_header = {
				headers: {
					'x-access-token': mock_context.user.token,
				},
			};
		});
		it('should resolve', async () => {
			axios.delete.mockImplementation(() => Promise.resolve({}));
			wrapper = mount(
				<MemoryRouter>
					<Context.Provider value={mock_context}>
						<ShowItem match={{ params: { id: 'mockId' } }} />
					</Context.Provider>
				</MemoryRouter>
			);
			wrapper = wrapper.childAt(0).childAt(0);
			wrapper.setState({ item: mock_data });
			wrapper
				.instance()
				.onDelete({ preventDefault: jest.fn() })
				.then(() => {
					expect(wrapper.state().redirect).toEqual('/items');
				});
			expect(axios.delete).toHaveBeenCalledWith(
				API_PATH_ITEMS + '/' + mock_data.data._id,
				mock_header
			);
		});

		it('should reject', async () => {
			axios.delete.mockImplementation(() => Promise.reject('error1'));
			wrapper = mount(
				<MemoryRouter>
					<Context.Provider value={mock_context}>
						<ShowItem match={{ params: { id: 'mockId' } }} />
					</Context.Provider>
				</MemoryRouter>
			);
			wrapper = wrapper.childAt(0).childAt(0);
			wrapper
				.instance()
				.onDelete({ preventDefault: jest.fn() })
				.catch(() => expect(mock_context.setError).toHaveBeenCalled());
		});
	});
});
