import React from 'react';

const Footer = () => {
	const top = () => {
		document.body.scrollTop = 0; // For Safari
		document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
	};
	return (
		<footer className='text-muted fixed-bottom'>
			<div className='container'>
				<p className='float-right'>
					<button
						id='scrollToTop'
						className='btn btn-outline-dark'
						onClick={top}
					>
						Back to top
					</button>
				</p>
				<p>Develped by &copy; AW</p>
			</div>
		</footer>
	);
};
export default Footer;
