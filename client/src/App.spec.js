import React from 'react';
import { shallow } from 'enzyme';
import App from './App';
import { signOut } from './_helper/LogInHandler';

jest.mock('./_helper/LogInHandler');

describe('<App />', () => {
	let wrapper;

	beforeAll(() => {
		signOut.mockImplementationOnce(() => jest.fn());
		sessionStorage.setItem('user', JSON.stringify({ name: 'name1' }));
		wrapper = shallow(<App />);
	});

	it('should render', () => {
		expect(wrapper.find('Routes')).toBeTruthy();
	});

	it('should read session', () => {
		expect(wrapper.state().user.name).toEqual('name1');
	});

	it('should set user', () => {
		wrapper.instance().setUser('name2');
		expect(wrapper.state().user.name).toEqual('name2');
	});

	it('should remove user', () => {
		wrapper.instance().removeUser();
		expect(wrapper.state().user.name).toEqual('');
		expect(signOut).toHaveBeenCalledTimes(1);
	});

	it('should have no user', () => {
		wrapper.unmount();
		sessionStorage.removeItem('user', null);
		wrapper = shallow(<App />);
		expect(wrapper.state().user.name).toEqual('');
	});
});
