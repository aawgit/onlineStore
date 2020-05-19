import React from 'react';
import { shallow } from 'enzyme';
import Facebook from './Facebook';
import FacebookLogin from 'react-facebook-login';
import axios from 'axios';
import { API_PATH_FACEBOOK } from '../constants';

jest.mock('axios');

const restoreLogin = Facebook.prototype.onLoginSuccess;
const restoreResponse = Facebook.prototype.responseFacebook;

describe('<Facebook />', () => {
	afterEach(() => {
		Facebook.prototype.onLoginSuccess = restoreLogin;
		Facebook.prototype.responseFacebook = restoreResponse;
	});

	it('should render', () => {
		const wrapper = shallow(<Facebook />);
		expect(wrapper.find(FacebookLogin)).toBeTruthy();
	});

	describe('responseFacebook', () => {
		let mock_onLoginSuccess, mock_response, wrapper;

		beforeEach(() => {
			mock_response = {
				accessToken: 'token1',
				name: 'name1',
				email: 'eamil',
				picture: {
					data: {
						url: 'url1',
					},
				},
			};
			mock_onLoginSuccess = jest.fn();
			Facebook.prototype.onLoginSuccess = mock_onLoginSuccess;
			wrapper = shallow(<Facebook />);
			wrapper.setState({
				redirect: false,
				user: {
					isLoggedIn: false,
					name: '',
					email: '',
					picture: '',
					accessToken: '',
				},
			});
		});

		afterEach(() => {
			mock_onLoginSuccess.mockRestore();
		});

		it('should set state and call onLoginSuccess', () => {
			wrapper.instance().responseFacebook(mock_response);
			expect(wrapper.state().user.isLoggedIn).toBeTruthy();
			expect(wrapper.state().user.accessToken).toBeTruthy();
			expect(mock_onLoginSuccess).toBeCalledTimes(1);
		});

		it('should log error if no token', () => {
			wrapper.instance().responseFacebook({ mock: { accessToken: false } });
			expect(wrapper.state().user.isLoggedIn).toBeFalsy();
			expect(wrapper.state().user.accessToken).toBeFalsy();
			expect(mock_onLoginSuccess).toBeCalledTimes(0);
		});
	});

	describe('onLoginSuccess', () => {
		let wrapper, mock_user, mock_data;
		beforeEach(() => {
			mock_user = { accessToken: 'accesstoken1' };
			mock_data = {
				data: {
					token: 'token1',
					userId: 'userid1',
					name: 'name1',
				},
			};
			sessionStorage.setItem('user', null);
			wrapper = shallow(<Facebook />);
		});

		it('should resolve', async () => {
			wrapper.setState({ user: mock_user });
			axios.post.mockImplementationOnce(() => Promise.resolve(mock_data));
			await wrapper
				.instance()
				.onLoginSuccess()
				.then(() => {
					expect(sessionStorage.getItem('user')).toBeTruthy();
					expect(wrapper.state().redirect).toEqual('/home');
				});
			expect(axios.post).toHaveBeenCalledWith(API_PATH_FACEBOOK, {
				access_token: mock_user.accessToken,
			});
		});

		it('should reject', async () => {
			axios.post.mockImplementationOnce(() => Promise.reject('error1'));
			await wrapper
				.instance()
				.onLoginSuccess()
				.catch((response) => {
					expect(response).toEqual(new Error('error1'));
				});
		});
	});

	describe('<FacebookLogin />', () => {
		it('should fire callback', () => {
			const mock_responseFacebook = jest.fn();
			Facebook.prototype.responseFacebook = mock_responseFacebook;
			const wrapper = shallow(<Facebook />);
			wrapper.find(FacebookLogin).props().callback();
			expect(mock_responseFacebook).toHaveBeenCalledTimes(1);
		});
	});
});
