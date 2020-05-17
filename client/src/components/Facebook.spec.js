import React from 'react';
import { shallow } from 'enzyme';
import Facebook, { API_PATH } from './Facebook';
import FacebookLogin from 'react-facebook-login';
import axios from 'axios';

jest.mock('axios');

global.console = {
	log: jest.fn(),
};

const restoreLogin = Facebook.prototype.onLoginSuccess;
const restoreResponse = Facebook.prototype.responseFacebook;

describe('<Facebook />', () => {
	afterEach(() => {
		Facebook.prototype.onLoginSuccess = restoreLogin;
		Facebook.prototype.responseFacebook = restoreResponse;
	});

	it('should render', () => {
		const wrapper = shallow(<Facebook />);
		expect(wrapper).toMatchSnapshot();
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
		let wrapper, resolve, reject, mock_user;
		beforeEach(() => {
			mock_user = { accessToken: 'accesstoken1' };
			resolve = Promise.resolve({
				data: {
					token: 'token1',
					userId: 'userid1',
					name: 'name1',
				},
			});
			reject = Promise.reject('error1');
			sessionStorage.setItem('user', null);
			wrapper = shallow(<Facebook />);
		});

		it('should resolve', async () => {
			wrapper.setState({ user: mock_user });
			axios.post.mockImplementationOnce(() => resolve);
			wrapper.instance().onLoginSuccess();
			await resolve;
			expect(axios.post).toHaveBeenCalledWith(API_PATH, {
				access_token: mock_user.accessToken,
			});
			expect(sessionStorage.getItem('user')).toBeTruthy();
			expect(wrapper.state().redirect).toBeTruthy();
			expect(wrapper.find('Redirect')).toBeTruthy();
		});

		it('should reject', async () => {
			try {
				axios.post.mockImplementationOnce(() => reject);
				await wrapper.instance().onLoginSuccess();
			} catch (e) {
				expect(global.console.log).toHaveBeenCalledWith('error1');
			}
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
