import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { ContextProvider } from './Context';
import Routes from './Routes';
import { Navbar } from './components';
import { Footer } from './components';

import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

class App extends React.Component {
	render() {
		return (
			<Router>
				<ContextProvider>
					<Navbar />
					<div className='content pb-5'>
						<Routes />
					</div>
					<Footer />
				</ContextProvider>
			</Router>
		);
	}
}

export default App;

ReactDOM.render(<App />, document.getElementById('root'));
