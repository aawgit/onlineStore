import React from 'react';
import { AppContext } from '../AppContext';
import LoginFormComp from '../components/LoginFormComp';

const Login = () => {
	const context = React.useContext(AppContext);
	return (
		<div>
			<LoginFormComp setUser={context.user.name} />
		</div>
	);
};

export default Login;
