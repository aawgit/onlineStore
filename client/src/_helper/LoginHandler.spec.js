import { checkLoggedIn, signOut } from './LogInHandler';

describe('Helper', () => {
	describe('checkLoggedIn', () => {
		let mock_user;

		beforeEach(() => {
			mock_user = { name: 'name1' };
			sessionStorage.setItem('user', JSON.stringify(mock_user));
		});

		it('should retrive user', () => {
			expect(checkLoggedIn()).toEqual(mock_user);
		});

		it('should return false', () => {
			sessionStorage.removeItem('user');
			expect(checkLoggedIn()).toBeFalsy();
		});
	});

	describe('signOut', () => {
		it('should remove user', () => {
			signOut();
			expect(sessionStorage.getItem('user')).toBeFalsy();
		});
	});
});
