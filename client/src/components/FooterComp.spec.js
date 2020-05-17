import React from 'react';
import { mount } from 'enzyme';
import FooterComp from './FooterComp';

describe('<FooterComp />', () => {
	let wrapper;

	beforeEach(() => {
		wrapper = mount(<FooterComp />);
	});

	it('should render', () => {
		expect(wrapper).toMatchSnapshot();
	});

	describe('Back to Top button', () => {
		it('should scroll top', () => {
			expect(document.body.scrollTop).toEqual(0);
			document.body.scrollTop = 100;
			wrapper.find('#scrollToTop').simulate('click');
			expect(document.body.scrollTop).toEqual(0);
		});
	});
});
