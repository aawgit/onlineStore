import React from 'react';
import { shallow } from 'enzyme';
import axios from 'axios';
import Login from './Login';
import { Facebook } from '../components';
import { API_PATH_LOGIN } from '../constants';

jest.mock('axios');

describe('<Login />', () => {
	it('should render', () => {
		const wrapper = shallow(<Login />);
		expect(wrapper.find(Facebook)).toHaveLength(1);
	});

	describe('onSubmit', () => {
		let wrapper, mock_data;

		beforeEach(() => {
			wrapper = shallow(<Login />);
			mock_data = {
				data: {
					token: 'token1',
					userId: 'userid1',
					name: 'name1',
				},
			};
		});

		it('should set session', async () => {
			axios.post.mockImplementationOnce(() => Promise.resolve(mock_data));
			wrapper
				.instance()
				.onSubmit({ preventDefault: jest.fn() })
				.then(() => {
					expect(JSON.parse(sessionStorage.getItem('user'))).toHaveProperty(
						'jwtToken',
						'userId',
						'name'
					);
					expect(wrapper.state().redirect).toBeTruthy();
				});
			expect(axios.post).toHaveBeenCalledWith(API_PATH_LOGIN, {});
		});

		it('should reject', async () => {
			axios.post.mockImplementationOnce(() => Promise.reject('error1'));
			wrapper
				.instance()
				.onSubmit({ preventDefault: jest.fn() })
				.catch((response) => {
					expect(response).toEqual(new Error('error1'));
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
