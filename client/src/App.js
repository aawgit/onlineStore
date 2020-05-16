import React, { Component } from 'react';
import { signOut } from './_helper/LogInHandler';

import Routes from './Routes';

export const Context = React.createContext(null);

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: {
				name: '',
			},
		};
	}

	setUser = (name) => {
		this.setState({ user: { name } });
	};

	componentDidMount() {
		if (sessionStorage.getItem('user')) {
			this.setState({
				user: { name: JSON.parse(sessionStorage.getItem('user')).name },
			});
		}
	}

	removeUser = () => {
		this.setState({ user: { name: '' } });
		signOut();
	};

	render() {
		const context = {
			user: this.state.user,
			removeUser: this.removeUser,
		};
		return (
			<Context.Provider value={context}>
				<Routes />
			</Context.Provider>
		);
	}
}

export default App;
