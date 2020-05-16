import React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import NavBarComp from './components/NavBarComp';
import FooterComp from './components/FooterComp';
import {
	Home,
	Shop,
	Contact,
	Login,
	Register,
	Profile,
	Item,
	AddItem,
	EditItem,
} from './routes';

const Routes = () => {
	return (
		<Router>
			<NavBarComp />
			<div className='content'>
				<Route exact path='/' component={Home} />
				<Route path='/shop' component={Shop} />
				<Route path='/contact' component={Contact} />
				<Route path='/login' component={Login} />
				<Route path='/register' component={Register} />
				<Route path='/profile' component={Profile} />
				<Route path='/viewItem/:id' component={Item} />
				<Route path='/addItem' component={AddItem} />
				<Route path='/editItem/:id' component={EditItem} />
			</div>
			<FooterComp />
		</Router>
	);
};

export default Routes;
