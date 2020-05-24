import React from 'react';
import { shallow, mount } from 'enzyme';
import Context from '../Context';
import { API_PATH_ITEMS } from '../constants';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';
import  from './ItemEditor';

jest.mock('axios');

const restoreCDM = ItemEditor.prototype.componentDidMount;
const restoreGetItems = ItemEditor.prototype.getItems;

describe('<ItemEditor />', () => {
	let wrapper,
		mock_context = {
			user: {
				token: 'token1',
			},
			setError: jest.fn(),
		},
		mock_CDM = jest.fn(),
		mock_getItems = jest.fn();

	beforeEach(() => {
		ItemEditor.prototype.componentDidMount = mock_CDM;
		ItemEditor.prototype.getItems = mock_getItems;
	});

	describe('componentDidMount', () => {
		it('should have been called', () => {
			wrapper = shallow(<ItemEditor />);
			expect(mock_CDM).toHaveBeenCalledTimes(1);
		});

		it('should set redirect to state', () => {
			ItemEditor.prototype.componentDidMount = restoreCDM;
			mock_context.user = false;
			wrapper = mount(
				<MemoryRouter>
					<Context.Provider value={mock_context}>
						<ItemEditor />
					</Context.Provider>
				</MemoryRouter>
			);
			expect(wrapper.childAt(0).childAt(0).state().redirect).toEqual('/login');
		});
	});

	describe('getItems', () => {
		beforeEach(() => {
			ItemEditor.prototype.getItems = restoreGetItems;
		});
		it('should resolve', async () => {
			const mock_data = {
				data: {
					name: 'name1',
					description: 'desc1',
					price: 'price1',
					file: 'file1',
				},
			};
			axios.get.mockImplementation(() => Promise.resolve(mock_data));
			wrapper = mount(
				<MemoryRouter>
					<Context.Provider value={mock_context}>
						<ItemEditor match={{ params: { id: 'mockId' } }} />
					</Context.Provider>
				</MemoryRouter>
			);
			wrapper = wrapper.childAt(0).childAt(0);
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
			wrapper = mount(
				<MemoryRouter>
					<Context.Provider value={mock_context}>
						<ItemEditor match={{ params: { id: 'mockId' } }} />
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

	describe('onValueChange', () => {
		it('should set state', () => {
			wrapper = shallow(<ItemEditor />);
			wrapper
				.instance()
				.onValueChange({ target: { name: 'mock', value: 'mock1' } });
			expect(wrapper.state().item.mock).toEqual('mock1');
		});
	});

	describe('onSubmit', () => {
		it('should resolve', async () => {
			const mock_state = {
				item: {
					name: 'name1',
					description: 'desc1',
					price: 'price1',
				},
			};
			const mock_data = {
				data: {
					_id: 'mockId',
				},
				name: 'name1',
				description: 'desc1',
				price: 'price1',
			};
			const mock_header = {
				headers: { 'x-access-token': mock_context.user.token },
			};
			axios.put.mockImplementation(() => Promise.resolve(mock_data));
			wrapper = mount(
				<MemoryRouter>
					<Context.Provider value={mock_context}>
						<ItemEditor match={{ params: { id: 'mockId' } }} />
					</Context.Provider>
				</MemoryRouter>
			);
			wrapper = wrapper.childAt(0).childAt(0);
			wrapper.setState({ item: mock_state.item });
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
			wrapper = mount(
				<MemoryRouter>
					<Context.Provider value={mock_context}>
						<ItemEditor match={{ params: { id: 'mockId' } }} />
					</Context.Provider>
				</MemoryRouter>
			);
			wrapper = wrapper.childAt(0).childAt(0);
			wrapper
				.instance()
				.onSubmit({ preventDefault: jest.fn() })
				.catch(() => expect(mock_context.setError).toHaveBeenCalled());
		});
	});
});
