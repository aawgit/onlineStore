import React from 'react';
import { Switch, Route } from 'react-router-dom';
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
		<Switch>
			<Route exact path='/' component={Home} />
			<Route path='/shop' component={Shop} />
			<Route path='/contact' component={Contact} />
			<Route path='/login' component={Login} />
			<Route path='/register' component={Register} />
			<Route path='/profile' component={Profile} />
			<Route path='/viewItem/:id' component={Item} />
			<Route path='/addItem' component={AddItem} />
			<Route path='/editItem/:id' component={EditItem} />
		</Switch>
	);
};

export default Routes;
