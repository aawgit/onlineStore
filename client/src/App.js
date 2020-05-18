import React, { Component } from 'react';
import { signOut } from './_helper/LogInHandler';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './Routes';
import { AppContext } from './AppContext';
import NavBarComp from './components/NavBarComp';
import FooterComp from './components/FooterComp';

class App extends Component {
	constructor(props) {
		super(props);
		this.setUser = this.setUser.bind(this);
		this.removeUser = this.removeUser.bind(this);
		this.state = {
			user: {
				name: '',
			},
			removeUser: () => this.removeUser(),
			setUser: (user) => this.setUser(user),
		};
	}

	componentDidMount() {
		if (sessionStorage.getItem('user')) {
			this.setState({
				user: { name: JSON.parse(sessionStorage.getItem('user')).name },
			});
		}
	}

	setUser(name) {
		this.setState({ user: { name } });
	}

	removeUser() {
		this.setState({ user: { name: '' } });
		signOut();
	}

	render() {
		return (
			<Router>
				<AppContext.Provider value={this.state}>
					<NavBarComp />
					<div className='content'>
						<Routes />
					</div>
					<FooterComp />
				</AppContext.Provider>
			</Router>
		);
	}
}

export default App;
