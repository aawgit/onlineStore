import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

describe('App Component', () => {
	it('should renders', () => {
		const wrapper = shallow(<App />);
		expect(wrapper.find('Routes')).toBeTruthy();
	});
});
