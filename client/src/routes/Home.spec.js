import React from 'react';
import { shallow, mount } from 'enzyme';
import axios from 'axios';
import Home from './Home';
import Context from '../Context';
import { MemoryRouter } from 'react-router-dom';
import { API_PATH_ITEMS } from '../constants';

jest.mock('axios');

const restoreCDM = Home.prototype.componentDidMount;
const restoreGetItems = Home.prototype.getItems;

describe('<Home />', () => {
	let wrapper,
		mock_context = {
			setError: jest.fn(),
		},
		mock_CDM = jest.fn(),
		mock_getItems = jest.fn(),
		mock_data = {
			data: [
				{
					_id: 0,
					name: 'image1',
					description: 'desc1',
					price: '1$',
					owner: {
						name: 'owner1',
					},
				},
			],
		};

	beforeEach(() => {
		Home.prototype.componentDidMount = mock_CDM;
		Home.prototype.getItems = mock_getItems;
	});

	it('should render', () => {
		wrapper = shallow(<Home />);
		expect(wrapper.find('main')).toHaveLength(1);
	});

	describe('componentDidMount', () => {
		it('should have been called', () => {
			wrapper = shallow(<Home />);
			expect(mock_CDM).toHaveBeenCalled();
		});

		it('should call getItems', () => {
			Home.prototype.componentDidMount = restoreCDM;
			wrapper = shallow(<Home />);
			expect(mock_getItems).toHaveBeenCalledTimes(1);
		});
	});

	describe('getItems', () => {
		beforeEach(() => {
			Home.prototype.getItems = restoreGetItems;
		});

		it('should resolve', async () => {
			axios.get.mockImplementationOnce(() => Promise.resolve(mock_data));
			wrapper = mount(
				<MemoryRouter>
					<Context.Provider value={mock_context}>
						<Home />
					</Context.Provider>
				</MemoryRouter>
			);
			wrapper = wrapper.childAt(0).childAt(0);
			wrapper
				.instance()
				.getItems()
				.then(() => {
					expect(wrapper.state().items).toMatchObject(mock_data.data);
				});
			expect(axios.get).toHaveBeenCalledWith(API_PATH_ITEMS);
		});

		it('should reject', async () => {
			axios.get.mockImplementationOnce(() => Promise.reject('error1'));
			wrapper = mount(
				<MemoryRouter>
					<Context.Provider value={mock_context}>
						<Home />
					</Context.Provider>
				</MemoryRouter>
			);
			wrapper = wrapper.childAt(0).childAt(0);
			wrapper
				.instance()
				.getItems()
				.catch((response) => {
					expect(response).toEqual(new Error('error1'));
				});
		});
	});
});
