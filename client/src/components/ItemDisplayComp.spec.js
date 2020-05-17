import React from 'react';
import { shallow } from 'enzyme';
import { render } from '@testing-library/react';
import axios from 'axios';
import ItemDisplayComp from './ItemDisplayComp';

jest.mock('axios');

describe('<ItemDisplayComp />', () => {
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
			.spyOn(ItemDisplayComp.prototype, 'componentDidMount')
			.mockImplementationOnce(() => data);
		const wrapper = shallow(<ItemDisplayComp />);
		wrapper.setState({ items: data });
		expect(spy).toHaveBeenCalledTimes(1);
		expect(wrapper.state().items).toHaveLength(1);
		expect(wrapper.find('.row').text()).toContain('image1');
	});

	it('should set item', async () => {
		const resolve = Promise.resolve({ data });
		axios.get.mockImplementationOnce(() => resolve);
		const wrapper = shallow(<ItemDisplayComp />);
		await resolve;
		expect(axios.get).toHaveBeenCalledWith('api/items');
		expect(wrapper.state().items).toMatchObject(data);
	});
	it('should log error', async () => {
		try {
			const reject = Promise.reject('error1');
			axios.get.mockImplementationOnce(() => reject);
			render(<ItemDisplayComp />);
		} catch (e) {
			expect(global.console.log).toHaveBeenCalledWith('error1');
		}
	});
});
