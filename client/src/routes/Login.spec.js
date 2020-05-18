import React from 'react';
import { shallow } from 'enzyme';
import axios from 'axios';
import Login from './Login';
import { Facebook } from '../components';
import { API_PATH_LOGIN } from '../constants';

jest.mock('axios');

global.console = {
	log: jest.fn(),
};

describe('<Login />', () => {
	it('should render', () => {
		const wrapper = shallow(<Login />);
		expect(wrapper.find(Facebook)).toHaveLength(1);
	});

	describe('onSubmit', () => {
		let wrapper, resolve, reject;

		beforeEach(() => {
			wrapper = shallow(<Login />);
			resolve = Promise.resolve({
				data: {
					token: 'token1',
					userId: 'userid1',
					name: 'name1',
				},
			});
			reject = Promise.reject(new Error({ response: { data: 'error1' } }));
		});

		it('should set session', async () => {
			axios.post.mockImplementationOnce(() => resolve);
			wrapper.instance().onSubmit({ preventDefault: jest.fn() });
			await resolve;
			expect(axios.post).toHaveBeenCalledWith(API_PATH_LOGIN, {});
			expect(JSON.parse(sessionStorage.getItem('user'))).toHaveProperty(
				'jwtToken',
				'userId',
				'name'
			);
			expect(wrapper.state().redirect).toBeTruthy();
			expect(wrapper.find('Redirect')).toBeTruthy();
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
			const wrapper = shallow(<Login />);
			wrapper.find('#inputEmail').simulate('change', {
				target: { name: 'emailName', value: 'emailValue' },
			});
			expect(wrapper.state().user.emailName).toEqual('emailValue');
		});
	});
});
