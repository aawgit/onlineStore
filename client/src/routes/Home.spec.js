import React from 'react';
import { shallow } from 'enzyme';
import { render } from '@testing-library/react';
import axios from 'axios';
import Home from './Home';
import { API_PATH_ITEMS } from '../constants';

jest.mock('axios');

describe('<Home />', () => {
	let data;

	global.console = {
		log: jest.fn(),
	};

	beforeEach(() => {
		data = [
			{
				_id: 0,
				name: 'image1',
				description: 'desc1',
				price: '1$',
				owner: {
					name: 'owner1',
				},
			},
		];
	});

	it('should render', () => {
		const spy = jest
			.spyOn(Home.prototype, 'componentDidMount')
			.mockImplementationOnce(() => data);
		const wrapper = shallow(<Home />);
		wrapper.setState({ items: data });
		expect(spy).toHaveBeenCalledTimes(1);
		expect(wrapper.state().items).toHaveLength(1);
		expect(wrapper.find('.row').text()).toContain('image1');
	});

	it('should set item', async () => {
		const resolve = Promise.resolve({ data });
		axios.get.mockImplementationOnce(() => resolve);
		const wrapper = shallow(<Home />);
		await resolve;
		expect(axios.get).toHaveBeenCalledWith(API_PATH_ITEMS);
		expect(wrapper.state().items).toMatchObject(data);
	});
	it('should log error', async () => {
		try {
			const reject = Promise.reject('error1');
			axios.get.mockImplementationOnce(() => reject);
			render(<Home />);
		} catch (e) {
			expect(global.console.log).toHaveBeenCalledWith('error1');
		}
	});
});
