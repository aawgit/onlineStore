import React from 'react';
import { Context } from '../App';
import LoginFormComp from '../components/LoginFormComp';

const Login = () => {
	const context = React.useContext(Context);
	return (
		<div>
			<LoginFormComp setUser={context.name} />
		</div>
	);
};

export default Login;
