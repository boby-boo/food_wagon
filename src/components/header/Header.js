import React from 'react';
import logo__icon from '../../resources/icons/foodwagon__logo.svg';
import map__icon from '../../resources/icons/map__icon.svg';

import './header.scss'

const Header = () => {
    return (
            <header className="header">
                <div className='container'>
                    <nav>
                        <ul className='header__row'>
                            <li className='header__row_logo'>
                                <a href="/">
                                    <img src={logo__icon} alt="foodwagon logo" />
                                    <div>
                                        food<span>wagon</span>  
                                    </div>
                                </a>
                            </li>
                            <li className='header__row_location location'>
                                Deliver to:
                                <div className='location__input'>
                                    <img src={map__icon} alt="map icon" />
                                Mohammadpur Bus Stand, Dhaka
                                {/* Current Location */}
                                </div>
                            </li>
                            <li className='header__row_user-panel'>
                                <input 
                                    type="text" 
                                    id='search__panel'
                                    placeholder='Search Food' 
                                    />
                                <button>
                                    Login
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>
    );
};

export default Header;