export const checkLoggedIn = () => {
	if (sessionStorage.getItem('user')) {
		return JSON.parse(sessionStorage.getItem('user'));
	} else return false;
};

export const signOut = () => {
	sessionStorage.removeItem('user');
};
