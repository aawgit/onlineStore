import React from 'react';
import { shallow } from 'enzyme';
import Contact from './Contact';

describe('<Contact />', () => {
	it('should render', () => {
		const wrapper = shallow(<Contact />);
		expect(wrapper.find('div')).toHaveLength(1);
	});
});
