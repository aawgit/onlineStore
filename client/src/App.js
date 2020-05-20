import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ContextProvider } from './Context';
import Routes from './Routes';
import { Navbar } from './components';
import { Footer } from './components';

class App extends Component {
	render() {
		return (
			<Router>
				<ContextProvider>
					<Navbar />
					<div className='content'>
						<Routes />
					</div>
					<Footer />
				</ContextProvider>
			</Router>
		);
	}
}

export default App;
