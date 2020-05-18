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

	describe('state passing', () => {
		beforeEach(() => {
			wrapper.unmount();
		});

		it('removeUser', () => {
			const mock_removeUser = jest.fn();
			App.prototype.removeUser = mock_removeUser;
			wrapper = shallow(<App />);
			expect(typeof wrapper.state().removeUser).toEqual('function');
			wrapper.state().removeUser();
			expect(mock_removeUser).toHaveBeenCalledTimes(1);
		});

		it('setUser', () => {
			const mock_setUser = jest.fn();
			App.prototype.setUser = mock_setUser;
			wrapper = shallow(<App />);
			expect(typeof wrapper.state().setUser).toEqual('function');
			wrapper.state().setUser({ user: { name: 'name1' } });
			expect(mock_setUser).toHaveBeenCalledTimes(1);
		});
	});
});
