import React from 'react';
import { shallow } from 'enzyme';
import Facebook from './Facebook';
import FacebookLogin from 'react-facebook-login';

// TODO api-logic and state
describe('Facebook Component', () => {
	it('renders with childs', async () => {
		const wrapper = shallow(<Facebook />);
		expect(wrapper.find(FacebookLogin)).toHaveLength(1);
	});
	it('callback fires', () => {
		const mockFn = jest.fn();
		Facebook.prototype.responseFacebook = mockFn;
		const wrapper = shallow(<Facebook />);
		wrapper.find(FacebookLogin).props().callback();
		expect(mockFn).toHaveBeenCalledTimes(1);
	});
});
