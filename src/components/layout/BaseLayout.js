import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const BaseLayout = () => {
    return (
        <div>
            <nav className='navbar navbar-expand-lg'>
                <div className="container-fluid">
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className='nav-item'>
                                <NavLink to='/' className='nav-link'>
                                    OMZ
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <hr />
            <Outlet />
        </div>
    );
};

export default BaseLayout;