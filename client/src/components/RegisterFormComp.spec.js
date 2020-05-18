import React from 'react';
import { shallow } from 'enzyme';
import axios from 'axios';
import { API_PATH_REGISTER } from '../constants';
import RegisterFormComp from './RegisterFormComp';

jest.mock('axios');

global.console = {
	log: jest.fn(),
};

describe('<RegisterFormComp />', () => {
	it('should render', () => {
		const wrapper = shallow(<RegisterFormComp />);
		expect(wrapper.find('.container')).toBeTruthy();
	});

	describe('onSubmit', () => {
		let wrapper, resolve, reject;

		beforeEach(() => {
			wrapper = shallow(<RegisterFormComp />);
			resolve = Promise.resolve({
				data: 'email1',
			});
			reject = Promise.reject(new Error({ response: { data: 'error1' } }));
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
			axios.post.mockImplementationOnce(() => resolve);
			wrapper.setState(mock_user);
			wrapper.instance().onSubmit({ preventDefault: jest.fn() });
			await resolve;
			expect(axios.post).toHaveBeenCalledWith(API_PATH_REGISTER, {
				email: 'email1',
				name: 'firstName1 lastName1',
				password: 'password1',
			});
			expect(wrapper.state().message).toBeTruthy();
		});

		it('should reject', async () => {
			try {
				axios.post.mockImplementationOnce(() => reject);
				await wrapper.instance().onSubmit({ preventDefault: jest.fn() });
			} catch (e) {
				expect(global.console.log).toHaveBeenCalledWith('error1');
			}
		});
	});

	describe('onValueChange', () => {
		it('should set state', () => {
			const wrapper = shallow(<RegisterFormComp />);
			wrapper.find('#email').simulate('change', {
				target: { name: 'emailName', value: 'emailValue' },
			});
			expect(wrapper.state().user.emailName).toEqual('emailValue');
		});
	});
});
