import React from 'react';
import { shallow, mount } from 'enzyme';
import Context from '../Context';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';
import { API_PATH_REGISTER } from '../constants';
import Register from './Register';

jest.mock('axios');

describe('<Register />', () => {
	let wrapper,
		mock_context = {
			user: {
				token: 'token1',
			},
			setUser: jest.fn(),
			setError: jest.fn(),
		};

	it('should render', () => {
		const wrapper = shallow(<Register />);
		expect(wrapper.find('.container')).toBeTruthy();
	});

	describe('componentDidMount', () => {
		it('should redirect user', () => {
			wrapper = mount(
				<MemoryRouter>
					<Context.Provider value={mock_context}>
						<Register />
					</Context.Provider>
				</MemoryRouter>
			);
			wrapper.childAt(0).childAt(0).instance().componentDidMount();
			expect(wrapper.childAt(0).childAt(0).state().redirect).toEqual('/shop');
		});
	});

	describe('onSubmit', () => {
		let wrapper;

		beforeEach(() => {
			wrapper = mount(
				<MemoryRouter>
					<Context.Provider value={mock_context}>
						<Register />
					</Context.Provider>
				</MemoryRouter>
			);
			wrapper = wrapper.childAt(0).childAt(0);
		});

		it('should resolve', async () => {
			const mock_user = {
				firstName: 'firstName1',
				lastName: 'lastName1',
				email: 'email1',
				password: 'password1',
			};
			axios.post.mockImplementationOnce(() => Promise.resolve({}));
			wrapper.setState({ user: mock_user });
			wrapper
				.instance()
				.onSubmit({ preventDefault: jest.fn() })
				.then(() => {
					expect(mock_context.setUser).toHaveBeenCalled();
					expect(wrapper.state().message).toEqual(
						`Verification e-mail has been sent to ${mock_user.email}.`
					);
				});
			expect(axios.post).toHaveBeenCalledWith(API_PATH_REGISTER, {
				email: 'email1',
				name: 'firstName1 lastName1',
				password: 'password1',
			});
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
			const wrapper = shallow(<Register />);
			wrapper.find('#email').simulate('change', {
				target: { name: 'emailName', value: 'emailValue' },
			});
			expect(wrapper.state().user.emailName).toEqual('emailValue');
		});
	});
});
