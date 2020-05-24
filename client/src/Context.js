import React, { Component } from 'react';
import { Alert } from './components';

/**
 * Connect child components with this constant once imported into them.
 *
 * Class Components (`class MyComponent extends React.Component { ... }`):
 *  - add a static property `static contextType = Context`
 *  - access contextual properties with `this.context.propertyName`
 *
 * Functional Components (`const MyComponent = ({props}) => { ... }`)
 * - use the out-of-the-box `React.useContext()` hook `const context = React.useContext( Context )`
 * - access contextual properties with `context.propertyName`
 *
 * This should be the single source of truth for all internal application state.
 *
 * @author Mátyás Angyal <amatyas001@gmail.com>
 * @version 0.1.2
 * @license MIT
 */
const Context = React.createContext();

/**
 * Provider allowing access to its own properties inside child components deep down the tree.
 * Application state is managed here just like in Redux without actions and dispatchers.
 * > **User state is kept in `sessionStorage` to persist values.**
 */
class ContextProvider extends Component {
	constructor(props) {
		super(props);
		this.setUser = this.setUser.bind(this);
		this.setItem = this.setItem.bind(this);
		this.removeUser = this.removeUser.bind(this);
		this.setError = this.setError.bind(this);
		this.state = {
			user: JSON.parse(sessionStorage.getItem('user')),
			item: JSON.parse(sessionStorage.getItem('item')),
			error: '',
		};
	}

	componentDidUpdate(prevProps, prevState) {
		for (let key in this.state) {
			if (this.state[key] !== prevState[key]) {
				sessionStorage.setItem(key, JSON.stringify(this.state[key]));
			}
		}
	}

	/**
	 * Stores the given user object in the internal state which will be passed down to the childs.
	 * This method ***does not validate*** the value, only put it in the store.
	 * @name ContextProvider.setUser()
	 * @param {object} user - User object
	 * @access public
	 */
	setUser(user) {
		this.setState({ user });
	}

	/**
	 * Stores an item instance to load it from context not from the server.
	 *
	 * @name ContextProvider.setItem()
	 * @param {object} Item - Array with the item
	 * @access public
	 */
	setItem(item) {
		this.setState({ item });
	}

	/**
	 * Bubbles error messages through the context API. This method ***does validate***
	 * the parameter and converts it into valid message which can be interpreted the handler.
	 * It accepts `new Error('message') object` and `string literals`
	 * @name ContextProvider.setError()
	 * @param {object|string} error Error object or message
	 * @access public
	 * @return {null} Null if invalid value given
	 */
	setError(error) {
		if (typeof error === 'string' && error.length) {
			error = {
				name: 'Unexpected Error',
				message: error,
				stack: 'No additional information given',
			};
		} else if (typeof error !== 'object') return null;
		this.setState({ error });
	}

	/**
	 * Unsets current user in the context. Overrides any value stored in the user object
	 * with an empty object.
	 * @access public
	 * @name ContextProvider.removeUser()
	 * @readonly
	 */
	removeUser() {
		this.setState({ user: false });
		this.forceUpdate();
	}

	render() {
		// methods & state = context
		const context = this.state;

		for (let key in this) {
			if (typeof this[key] === 'function') {
				context[key] = this[key];
			}
		}

		return (
			<Context.Provider value={context}>
				{context.error && (
					<Alert header='Something wrong...' message={context.error.message} />
				)}
				{this.props.children}
			</Context.Provider>
		);
	}
}

export default Context;

export { ContextProvider };
