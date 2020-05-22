import React from 'react';
import { Switch, Route } from 'react-router-dom';
import {
	Home,
	Contact,
	Login,
	Register,
	Profile,
	ShowItem,
	AddItem,
	EditItem,
} from './routes';

const Routes = () => {
	return (
		<Switch>
			<Route exact path={['/', '/items', '/home']} component={Home} />
			<Route path='/contact' component={Contact} />
			<Route path='/login' component={Login} />
			<Route path='/register' component={Register} />
			<Route path='/profile' component={Profile} />
			<Route path='/items/show/:id' component={ShowItem} />
			<Route path='/items/add' component={AddItem} />
			<Route path='/items/edit/:id' component={EditItem} />
		</Switch>
	);
};

export default Routes;
