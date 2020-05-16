import React from 'react';
import { mount } from 'enzyme';
import { Route, MemoryRouter } from 'react-router-dom';
import App from './App';
import Home from './routes/Home';
import Login from './routes/Login';
import Register from './routes/Register';
import Item from './routes/Item';
import AddItem from './routes/AddItem';
import EditItem from './routes/EditItem';
import NavBarComp from './components/NavBarComp';
import FooterComp from './components/FooterComp';

const mockSignOut = jest.fn();

describe('App Component', () => {
	it('renders with childs', () => {
		const wrapper = mount(<App />);
		expect(wrapper.text()).toContain('Shop');
	});
});
