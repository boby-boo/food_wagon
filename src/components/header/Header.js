import { useState } from 'react';
import logo__icon from '../../resources/icons/foodwagon__logo.svg';
import map__icon from '../../resources/icons/map__icon.svg';
import menuButton from '../../resources/icons/header__menu_button.svg';
import menuButtonClosed from '../../resources/icons/header__menu_button-closed.svg';

import './header.scss'
import DeliveryBanner from '../deliveryBanner/DeliveryBanner';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = () => {
        setIsOpen(!isOpen)
    }

    if (isOpen) {
        return (
            <div className='header__mobile-menu'>
                <nav className="container">
                    <ul className='header__mobile-menu_row'>
                        <li className='header__row_logo'>
                            <a href="/">
                                <img src={logo__icon} alt="foodwagon logo" />
                                <div>
                                    food<span>wagon</span>  
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href='/'>How does it work</a>
                        </li>
                        <li>
                            <a href='/'>Popular items</a>
                        </li>
                        <li>
                            <a href='/'>Featured Restaurants</a>
                        </li>
                        <li>
                            <a href='/'>Search by Food</a>
                        </li>
                        <li>
                            <button onClick={handleClick}>
                                <img src={menuButtonClosed} alt="burger menu icon closed" />
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
        )
    }

    return (
        <>
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
                                <div className='location__input'>
                                    <img src={map__icon} alt="map icon" />
                                Mohammadpur Bus Stand, Dhaka
                                </div>
                            </li>
                            <li className='header__row_user-panel'>
                                <input 
                                    type="text" 
                                    id='search__panel'
                                    placeholder='Search Food' 
                                    />
                                <button>Login</button>
                            </li>
                            <li className='header__menu-button'>
                                <button onClick={handleClick}>
                                    {!isOpen && <img src={menuButton} alt='burger menu icon' />}
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>
            <DeliveryBanner/>
        </>
    );
};

export default Header;