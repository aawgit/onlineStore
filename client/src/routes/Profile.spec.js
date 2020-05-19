import React from 'react';
import { shallow } from 'enzyme';
import Profile from './Profile';

describe('<Profile />', () => {
	it('should render', () => {
		const wrapper = shallow(<Profile />);
		expect(wrapper.find('div')).toHaveLength(1);
	});
});
