import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 *
 */
class Alert extends Component {
	constructor(props) {
		super(props);
		this.state = {
			show: true,
		};
	}
	render() {
		return (
			this.state.show && (
				<div
					className='alert alert-danger fixed-top mt-5 mx-5'
					style={{ zIndex: 9000 }}
					role='alert'
				>
					<h4 className='alert-heading'>{this.props.header}</h4>
					{this.props.message}
					<button
						type='button'
						className='close'
						aria-label='Close'
						onClick={() => this.setState({ show: false })}
					>
						<span aria-hidden='true'>&times;</span>
					</button>
				</div>
			)
		);
	}
}

Alert.propTypes = {
	header: PropTypes.string.isRequired,
	message: PropTypes.string.isRequired,
};

export default Alert;
