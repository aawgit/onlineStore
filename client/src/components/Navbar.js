import React from 'react';
import Context from '../Context';
import { Link } from 'react-router-dom';

const Navbar = () => {
	const context = React.useContext(Context);
	return (
		<div>
			<nav className='navbar navbar-expand-md navbar-dark bg-dark'>
				<div className='navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2'>
					<ul className='navbar-nav mr-auto'>
						<li className='nav-item'>
							<Link className='nav-link' to='/home'>
								Home
							</Link>
						</li>
						<li className='nav-item'>
							<Link className='nav-link' to='/contact'>
								Contact us
							</Link>
						</li>
					</ul>
				</div>
				<div className='mx-auto order-0'>
					<Link className='navbar-brand mx-auto' to='/home'>
						{process.env.REACT_APP_NAME}
					</Link>
					<button
						className='navbar-toggler'
						type='button'
						data-toggle='collapse'
						data-target='.dual-collapse2'
					>
						<span className='navbar-toggler-icon' />
					</button>
				</div>
				<div className='navbar-collapse collapse w-100 order-3 dual-collapse2'>
					{context.user ? (
						<ul className='navbar-nav ml-auto'>
							<li>
								<Link to='/profile' className='nav-link'>
									{context.user.name}
								</Link>
							</li>
							<li>
								<Link to='/items/add' className='btn btn-success mx-1'>
									{' '}
									Add item{' '}
								</Link>
							</li>
							<li>
								<button
									onClick={context.removeUser}
									className='btn btn-outline-light'
								>
									{' '}
									Sign out{' '}
								</button>
							</li>
						</ul>
					) : (
						<ul className='navbar-nav ml-auto'>
							<li className='nav-item'>
								<Link className='nav-link' to='/login'>
									Login
								</Link>
							</li>
							<li className='nav-item'>
								<Link className='nav-link' to='/register'>
									Register
								</Link>
							</li>
						</ul>
					)}
				</div>
			</nav>
		</div>
	);
};

export default Navbar;
