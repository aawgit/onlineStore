import React, { Component } from 'react';

class ScrollToTop extends Component {
	constructor(props) {
		super(props);
		this.state = {
			is_visible: false,
		};
	}

	componentDidMount() {
		var scrollComponent = this;
		document.addEventListener('scroll', function (e) {
			scrollComponent.toggleVisibility();
		});
	}

	toggleVisibility() {
		if (window.pageYOffset > 300) {
			this.setState({
				is_visible: true,
			});
		} else {
			this.setState({
				is_visible: false,
			});
		}
	}

	scrollToTop() {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	}

	render() {
		const { is_visible } = this.state;
		return (
			<div className='scroll-to-top'>
				{is_visible && (
					<button
						className='btn btn-lg btn-secondary'
						onClick={() => this.scrollToTop()}
					>
						Back to top
					</button>
				)}
			</div>
		);
	}
}

export default ScrollToTop;
