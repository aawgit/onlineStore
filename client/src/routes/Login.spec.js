import React from 'react';
import { shallow, mount } from 'enzyme';
import Context from '../Context';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';
import Login from './Login';
import { Facebook } from '../components';
import { API_PATH_LOGIN } from '../constants';

jest.mock('axios');
jest.mock('../components/Facebook');

describe('<Login />', () => {
	let wrapper,
		mock_context = {
			user: {
				token: 'token1',
			},
			setUser: jest.fn(),
			setError: jest.fn(),
		};

	it('should render', () => {
		const wrapper = shallow(<Login />);
		expect(wrapper.find(Facebook)).toHaveLength(1);
	});

	describe('componentDidMount', () => {
		it('should redirect user', () => {
			wrapper = mount(
				<MemoryRouter>
					<Context.Provider value={mock_context}>
						<Login />
					</Context.Provider>
				</MemoryRouter>
			);
			wrapper.childAt(0).childAt(0).instance().componentDidMount();
			expect(wrapper.childAt(0).childAt(0).state().redirect).toEqual('/shop');
		});
	});

	describe('onSubmit', () => {
		let wrapper, mock_data;

		beforeEach(() => {
			mock_context.user = false;
			mock_data = {
				data: {
					token: 'token1',
				},
			};
			wrapper = mount(
				<MemoryRouter>
					<Context.Provider value={mock_context}>
						<Login />
					</Context.Provider>
				</MemoryRouter>
			);
			wrapper = wrapper.childAt(0).childAt(0);
		});

		it('should set user', async () => {
			axios.post.mockImplementationOnce(() => Promise.resolve(mock_data));
			wrapper
				.instance()
				.onSubmit({ preventDefault: jest.fn() })
				.then(() => {
					expect(mock_context.setUser).toHaveBeenCalled();
					expect(wrapper.state().redirect).toBeTruthy();
				});
			expect(axios.post).toHaveBeenCalledWith(API_PATH_LOGIN, {});
		});

		it('should reject', async () => {
			axios.post.mockImplementationOnce(() => Promise.reject('error1'));
			wrapper
				.instance()
				.onSubmit({ preventDefault: jest.fn() })
				.catch(() => {
					expect(mock_context.setError).toHaveBeenCalled();
				});
		});
	});

	describe('onValueChange', () => {
		it('should set state', () => {
			const wrapper = shallow(<Login />);
			wrapper.find('#inputEmail').simulate('change', {
				target: { name: 'emailName', value: 'emailValue' },
			});
			expect(wrapper.state().user.emailName).toEqual('emailValue');
		});
	});
});
