import React from 'react';
import ScrollToTop from './ScrollToTop';

const Footer = () => {
	return (
		<footer className='text-muted fixed-bottom bg-dark navbar'>
			<div>
				<p className='ml-5 my-1'>
					FOSS developed by GitHub Community |&nbsp;
					{process.env.REACT_APP_NAME +
						' ' +
						process.env.REACT_APP_VERSION}{' '}
					&copy; {new Date().getFullYear()}
				</p>
			</div>
			<ScrollToTop />
		</footer>
	);
};
export default Footer;
