import React from 'react';
import { render } from 'enzyme';
import Context from '../Context';
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
				<Context.Provider value={context}>
					<Navbar />
				</Context.Provider>
			</MemoryRouter>
		);
		expect(wrapper.find('div').text()).not.toHaveLength(0);
	});

	it('should render guest navbar', () => {
		context = { ...context, user: { name: false } };
		const wrapper = render(
			<MemoryRouter>
				<Context.Provider value={context}>
					<Navbar />
				</Context.Provider>
			</MemoryRouter>
		);
		expect(wrapper.find('div').text()).not.toHaveLength(0);
		expect(wrapper.find('div').text()).not.toContain('Sign out');
		expect(wrapper.find('div').text()).toContain('Login');
	});
});
