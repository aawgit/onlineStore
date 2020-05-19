import React from 'react';
import { shallow } from 'enzyme';
import axios from 'axios';
import AddItem from './AddItem';
import { checkLoggedIn } from '../utils/LogInHandler';
import { API_PATH_ITEMS } from '../constants';

jest.mock('axios');
jest.mock('../utils/LogInHandler');

const restoreCDM = AddItem.prototype.componentDidMount;

describe('<AddItem />', () => {
	let wrapper,
		mock_login = true,
		mock_CDM = jest.fn();

	beforeEach(() => {
		checkLoggedIn.mockImplementationOnce(() => mock_login);
		AddItem.prototype.componentDidMount = mock_CDM;
	});

	describe('componentDidMount', () => {
		it('should have been called', () => {
			wrapper = shallow(<AddItem />);
			expect(mock_CDM).toHaveBeenCalledTimes(1);
		});

		it('should call checkLoggedIn', () => {
			AddItem.prototype.componentDidMount = restoreCDM;
			wrapper = shallow(<AddItem />);
			expect(wrapper.find('.container')).toHaveLength(1);
			expect(checkLoggedIn).toHaveBeenCalledTimes(1);
		});

		it('should set redirect to state', async () => {
			AddItem.prototype.componentDidMount = restoreCDM;
			mock_login = false;
			wrapper = shallow(<AddItem />);
			expect(wrapper.state().redirect).toEqual('/login');
		});
	});

	describe('onValueChange', () => {
		beforeEach(() => {
			wrapper = shallow(<AddItem />);
		});

		it('should set state', () => {
			wrapper
				.instance()
				.onValueChange({ target: { name: 'mock', value: 'mock1' } });
			expect(wrapper.state().item.mock).toEqual('mock1');
		});

		it('should set file to state', () => {
			wrapper
				.find('#file')
				.props()
				.onChange({ target: { name: 'file', files: ['mock.png'] } });
			expect(wrapper.state().item.file).toEqual('mock.png');
		});
	});

	describe('onSubmit', () => {
		it('should resolve', async () => {
			const mock_response = {
				data: {
					_id: 'mock1',
				},
			};
			const mock_state = {
				item: {
					name: 'name1',
					description: 'desc1',
					price: 'price1',
					file: 'file1',
				},
			};
			const mock_header = {
				headers: {
					'x-access-token': 'token1',
				},
			};
			const mock_data = new FormData();
			Object.keys(mock_state.item).forEach((key) =>
				mock_data.append(key, mock_state.item[key])
			);
			sessionStorage.setItem('user', JSON.stringify({ jwtToken: 'token1' }));
			axios.post.mockImplementationOnce(() => Promise.resolve(mock_response));
			wrapper = shallow(<AddItem />);
			wrapper.setState(mock_state);
			wrapper
				.instance()
				.onSubmit({ preventDefault: jest.fn() })
				.then(() => {
					expect(wrapper.state().redirect).toEqual('/viewItem/mock1');
				});
			expect(axios.post).toHaveBeenCalledWith(
				API_PATH_ITEMS,
				mock_data,
				mock_header
			);
		});

		it('should reject', async () => {
			axios.post.mockImplementationOnce(() => Promise.reject('error1'));
			wrapper
				.instance()
				.onSubmit({ preventDefault: jest.fn() })
				.catch((response) => {
					expect(response).toEqual(new Error('error1'));
				});
		});
	});
});
