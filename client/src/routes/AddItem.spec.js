import React from 'react';
import { shallow, mount } from 'enzyme';
import Context from '../Context';
import { API_PATH_ITEMS } from '../constants';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';
import AddItem from './AddItem';

jest.mock('axios');

const restoreCDM = AddItem.prototype.componentDidMount;

describe('<AddItem />', () => {
	let wrapper,
		mock_context = {
			user: {
				token: 'token1',
			},
			setError: jest.fn(),
		},
		mock_CDM = jest.fn();

	beforeEach(() => {
		AddItem.prototype.componentDidMount = mock_CDM;
	});

	describe('componentDidMount', () => {
		it('should have been called', () => {
			wrapper = shallow(<AddItem />);
			expect(mock_CDM).toHaveBeenCalledTimes(1);
		});

		it('should set redirect to state', async () => {
			AddItem.prototype.componentDidMount = restoreCDM;
			mock_context.user = false;
			wrapper = mount(
				<MemoryRouter>
					<Context.Provider value={mock_context}>
						<AddItem />
					</Context.Provider>
				</MemoryRouter>
			);
			expect(wrapper.childAt(0).childAt(0).state().redirect).toEqual('/login');
		});
	});

	describe('onValueChange', () => {
		beforeEach(() => {
			wrapper = shallow(<AddItem />);
		});

		it('should set state', () => {
			wrapper
				.instance()
				.onValueChange({ target: { name: 'mock', value: 'mock1' } });
			expect(wrapper.state().item.mock).toEqual('mock1');
		});

		it('should set file to state', () => {
			wrapper
				.find('#file')
				.props()
				.onChange({ target: { name: 'file', files: ['mock.png'] } });
			expect(wrapper.state().item.file).toEqual('mock.png');
		});
	});

	describe('onSubmit', () => {
		it('should resolve', async () => {
			const mock_response = {
				data: {
					_id: 'mock1',
				},
			};
			const mock_state = {
				item: {
					name: 'name1',
					description: 'desc1',
					price: 'price1',
					file: 'file1',
				},
			};
			const mock_header = {
				headers: { 'x-access-token': mock_context.user.token },
			};
			const mock_data = new FormData();
			Object.keys(mock_state.item).forEach((key) =>
				mock_data.append(key, mock_state.item[key])
			);
			axios.post.mockImplementationOnce(() => Promise.resolve(mock_response));
			wrapper = mount(
				<MemoryRouter>
					<Context.Provider value={mock_context}>
						<AddItem />
					</Context.Provider>
				</MemoryRouter>
			);
			wrapper = wrapper.childAt(0).childAt(0);
			wrapper.setState(mock_state);
			wrapper
				.instance()
				.onSubmit({ preventDefault: jest.fn() })
				.then(() => {
					expect(wrapper.state().redirect).toEqual('/viewItem/mock1');
				});
			expect(axios.post).toHaveBeenCalledWith(
				API_PATH_ITEMS,
				mock_data,
				mock_header
			);
		});

		it('should reject', async () => {
			axios.post.mockImplementationOnce(() => Promise.reject('error1'));
			wrapper = mount(
				<MemoryRouter>
					<Context.Provider value={mock_context}>
						<AddItem />
					</Context.Provider>
				</MemoryRouter>
			);
			wrapper = wrapper.childAt(0).childAt(0);
			wrapper
				.instance()
				.onSubmit({ preventDefault: jest.fn() })
				.catch((response) => {
					expect(mock_context.setError).toHaveBeenCalled();
				});
		});
	});
});
