import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * Confirmation takes text input ***action*** which will be applied on
 * the ***subject*** by executing ***confirm*** callback or call ***cancel***
 * to retreat.
 *  ***
 * The following example will prompt the user: ***Warning! Please confirm your action: Are you sure to delete Fancy item?***
 * @example
 * <Confirmation
 *  action="delete"
 *  subject="Fancy item"
 *  confirm={this.deleteItem('Fancy item')}
 *  cancel={this.redirectRoute('Home')}
 * />
 *
 * @property {string} action - Describing the kind of operation
 * @property {string} subject - Describing the subject of the action
 * @property {function} confirm - Callback function which executes when the user confirms
 * @property {function} cancel - Callback function which executes when the use cancels
 */
class Confirmation extends Component {
	render() {
		return (
			<div
				className='alert alert-info d-flex'
				style={{ zIndex: 9000 }}
				role='alert'
			>
				<span className='alert-heading align-self-end pb-1'>
					<h5 className='text-muted'>
						Are you sure you want to{' '}
						<strong>
							{this.props.action} {this.props.subject}
						</strong>
						?
					</h5>
				</span>
				<div className='btn-group btn-group-lg ml-auto'>
					<button
						style={{ minWidth: '150px' }}
						onClick={this.props.confirm}
						className='btn btn-lg btn-outline-danger'
					>
						Confirm
					</button>
					<button
						style={{ minWidth: '150px' }}
						onClick={this.props.cancel}
						className='btn btn-lg btn-info'
					>
						<strong>Cancel</strong>
					</button>
				</div>
			</div>
		);
	}
}

Confirmation.propTypes = {
	action: PropTypes.string.isRequired,
	subject: PropTypes.string.isRequired,
	confirm: PropTypes.func.isRequired,
	cancel: PropTypes.func.isRequired,
};

export default Confirmation;
