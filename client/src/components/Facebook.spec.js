import React from 'react';
import { shallow, mount } from 'enzyme';
import Context from '../Context';
import { API_PATH_FACEBOOK } from '../constants';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';
import Facebook from './Facebook';
import FacebookLogin from 'react-facebook-login';

jest.mock('axios');
jest.mock('react-facebook-login');

describe('<Facebook />', () => {
	it('should render', () => {
		const wrapper = shallow(<Facebook />);
		expect(wrapper.find(FacebookLogin)).toHaveLength(1);
	});

	describe('handleResponse', () => {
		let wrapper, mock_context;

		beforeEach(() => {
			mock_context = {
				setUser: jest.fn(),
				setError: jest.fn(),
			};
			wrapper = mount(
				<MemoryRouter>
					<Context.Provider value={mock_context}>
						<Facebook />
					</Context.Provider>
				</MemoryRouter>
			);
		});

		it('should resolve', async () => {
			axios.post.mockImplementationOnce(() =>
				Promise.resolve({ data: 'user1' })
			);
			wrapper
				.childAt(0)
				.childAt(0)
				.instance()
				.handleResponse({ accessToken: 'accesstoken1' })
				.then(() => {
					expect(context.setUser).toHaveBeenCalled();
					expect(wrapper.childAt(0).childAt(0).state().redirect).toEqual(
						'/home'
					);
				});
			expect(axios.post).toHaveBeenCalledWith(API_PATH_FACEBOOK, {
				access_token: 'accesstoken1',
			});
		});

		it('should reject', async () => {
			axios.post.mockImplementationOnce(() =>
				Promise.reject(new Error('error1'))
			);
			wrapper
				.childAt(0)
				.childAt(0)
				.instance()
				.handleResponse({ accessToken: 'accesstoken1' })
				.catch(() => {
					expect(context.setError).toHaveBeenCalled();
				});
		});
	});
});
