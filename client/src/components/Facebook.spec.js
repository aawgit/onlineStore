import React from 'react';
import { shallow } from 'enzyme';
import Facebook, { API_PATH } from './Facebook';
import FacebookLogin from 'react-facebook-login';
import axios from 'axios';

jest.mock('axios');

global.console = {
	log: jest.fn(),
};

describe('<Facebook />', () => {
	const restoreLogin = Facebook.prototype.onLoginSuccess;
	const restoreResponse = Facebook.prototype.responseFacebook;

	afterEach(() => {
		Facebook.prototype.onLoginSuccess = restoreLogin;
		Facebook.prototype.responseFacebook = restoreResponse;
	});

	it('should render', () => {
		const wrapper = shallow(<Facebook />);
		expect(wrapper.find(FacebookLogin)).toHaveLength(1);
	});

	it('should fire responseFacebook', () => {
		const mock_onLoginSuccess = jest.fn();
		const response = {
			accessToken: 'token1',
			name: 'name1',
			email: 'eamil',
			picture: {
				data: {
					url: 'url1',
				},
			},
		};
		Facebook.prototype.onLoginSuccess = mock_onLoginSuccess;
		const wrapper = shallow(<Facebook />);
		wrapper.instance().responseFacebook(response);
		expect(wrapper.state().user.isLoggedIn).toBeTruthy();
		expect(wrapper.state().user.accessToken).toBeTruthy();
		expect(mock_onLoginSuccess).toBeCalledTimes(1);
	});

	it('should set onLoginSuccess resolved', async () => {
		const resolve = Promise.resolve({
			data: {
				token: 'token1',
				userId: 'userid1',
				name: 'name1',
			},
		});
		axios.post.mockImplementationOnce(() => resolve);
		const wrapper = shallow(<Facebook />);
		wrapper.setState({ user: { accessToken: 'accesstoken1' } });
		sessionStorage.setItem('user', null);
		wrapper.instance().onLoginSuccess();
		await resolve;
		expect(axios.post).toHaveBeenCalledWith(API_PATH, {
			access_token: 'accesstoken1',
		});
		expect(sessionStorage.getItem('user')).toBeTruthy();
		expect(wrapper.state('redirect')).toEqual(true);
		expect(wrapper.find('Redirect')).toBeTruthy();
	});

	it('should log onLoginSuccess rejected', async () => {
		try {
			const reject = Promise.reject('error1');
			axios.post.mockImplementationOnce(() => reject);
			const wrapper = shallow(<Facebook />);
			wrapper.instance().onLoginSuccess();
		} catch (e) {
			expect(global.console.log).toHaveBeenCalledWith('error1');
		}
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
