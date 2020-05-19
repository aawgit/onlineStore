import React from 'react';
import { shallow } from 'enzyme';
import axios from 'axios';
import { API_PATH_REGISTER } from '../constants';
import Register from './Register';

jest.mock('axios');

describe('<Register />', () => {
	it('should render', () => {
		const wrapper = shallow(<Register />);
		expect(wrapper.find('.container')).toBeTruthy();
	});

	describe('onSubmit', () => {
		let wrapper;

		beforeEach(() => {
			wrapper = shallow(<Register />);
		});

		it('should resolve', async () => {
			const mock_user = {
				user: {
					firstName: 'firstName1',
					lastName: 'lastName1',
					email: 'email1',
					password: 'password1',
				},
			};
			const mock_data = {
				data: 'email1',
			};
			axios.post.mockImplementationOnce(() => Promise.resolve(mock_data));
			wrapper.setState(mock_user);
			wrapper
				.instance()
				.onSubmit({ preventDefault: jest.fn() })
				.then(() => {
					expect(wrapper.state().message).toEqual(
						`Verification e-mail has been sent to ${mock_data.data}.`
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
			await wrapper
				.instance()
				.onSubmit({ preventDefault: jest.fn() })
				.catch((response) => {
					expect(response).toEqual(new Error('error1'));
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
