import React from 'react';
import { shallow } from 'enzyme';
import Routes from './Routes';
import { Switch, Route } from 'react-router-dom';

describe('<Routes />', () => {
	it('should render', () => {
		const wrapper = shallow(<Routes />);
		expect(wrapper.find(Switch)).toBeTruthy();
	});
});
