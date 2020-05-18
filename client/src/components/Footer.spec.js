import React from 'react';
import { mount } from 'enzyme';
import Footer from './Footer';

describe('<Footer />', () => {
	let wrapper;

	beforeEach(() => {
		wrapper = mount(<Footer />);
	});

	it('should render', () => {
		expect(wrapper.find('.container')).toBeTruthy();
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
