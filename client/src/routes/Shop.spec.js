import React from 'react';
import { shallow } from 'enzyme';
import Shop from './Shop';

describe('<Shop />', () => {
	it('should render', () => {
		const wrapper = shallow(<Shop />);
		expect(wrapper.find('div')).toHaveLength(1);
	});
});
