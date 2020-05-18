import React from 'react';
import { render } from 'enzyme';
import { AppContext } from '../AppContext';
import { MemoryRouter } from 'react-router-dom';
import Navbar from './Navbar';

let context = {
	user: { name: 'name1' },
	removeUser: () => jest.fn(),
};

describe('<Navbar />', () => {
	it('should render user navbar', () => {
		const wrapper = render(
			<MemoryRouter>
				<AppContext.Provider value={context}>
					<Navbar />
				</AppContext.Provider>
			</MemoryRouter>
		);
		expect(wrapper.find('.navbar')).toBeTruthy();
		expect(wrapper.find('Sign out')).toBeTruthy();
		expect(wrapper.find('Login').text()).toBeFalsy();
	});
	it('should render guest navbar', () => {
		context = { ...context, user: { name: false } };
		const wrapper = render(
			<MemoryRouter>
				<AppContext.Provider value={context}>
					<Navbar />
				</AppContext.Provider>
			</MemoryRouter>
		);
		expect(wrapper.find('.navbar')).toBeTruthy();
		expect(wrapper.find('Sign out').text()).toBeFalsy();
		expect(wrapper.find('Login')).toBeTruthy();
	});
});
