import React from 'react';
import { shallow } from 'enzyme';
import { ContextProvider } from './Context';

describe('<Context />', () => {
	let wrapper;

	beforeAll(() => {
		wrapper = shallow(<ContextProvider />);
	});

	it('should render children', () => {
		wrapper.setProps({ children: <div /> });
		expect(wrapper.contains(<div />)).toBeTruthy();
	});

	it('setUser', () => {
		wrapper.instance().setUser({ name: 'name2' });
		expect(wrapper.state().user.name).toEqual('name2');
	});

	it('removeUser', () => {
		wrapper.instance().removeUser();
		expect(wrapper.state().user).toMatchObject({});
	});

	it('setError with object', () => {
		wrapper.instance().setError(new Error('error1'));
		expect(wrapper.find('.alert-heading').text()).toContain('error1');
	});

	it('setError with string', () => {
		wrapper.instance().setError('error1');
		expect(wrapper.find('.alert-heading').text()).toContain('error1');
	});

	it('setError return null', () => {
		expect(wrapper.instance().setError(Number(1))).toBeFalsy();
	});
});
