/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';

const FooterComp = () => {
	const top = () => {
		document.body.scrollTop = 0; // For Safari
		document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
	};
	return (
		<div>
			<footer className='text-muted'>
				<div className='container'>
					<p className='float-right'>
						<a href='#' onClick={top}>
							Back to top
						</a>
					</p>
					<p>Develped by &copy; AW</p>
				</div>
			</footer>
		</div>
	);
};
export default FooterComp;
