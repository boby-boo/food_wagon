import { useState } from 'react';
import { Link } from "react-router-dom";

import logo__icon from '../../resources/icons/foodwagon__logo.svg';
import menuButton from '../../resources/icons/header__menu_button.svg';
import menuButtonClosed from '../../resources/icons/header__menu_button-closed.svg';
import ModalAuth from '../modalAuth/ModalAuth';

import { useSelector } from 'react-redux';

import './header.scss'

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenModalWindow, setIsOpenModalWindow] = useState(false);

    const login = useSelector(state => state.login);

    const handleClick = () => {
        setIsOpen(!isOpen)
    }

    const toggleModalOpen = () => {
        setIsOpenModalWindow(!isOpenModalWindow)
    }
    
    if (isOpen) {
        return (
            <div className='header__mobile-menu'>
                <nav className='container'>
                    <ul className='header__mobile-menu_row'>
                        <li className='header__row_logo'>
                            <a href='/'>
                                <img src={logo__icon} alt='foodwagon logo' />
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
                                <img src={menuButtonClosed} alt='burger menu icon closed' />
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
        )
    }

    return (
        <>
            <header className='header'>
                <div className='container'>
                    <nav>
                        <ul className='header__row'>
                            <li className='header__row_logo'>
                                <Link to='/'>
                                    <img src={logo__icon} alt='foodwagon logo' />
                                    <div>
                                        food<span>wagon</span>  
                                    </div>
                                </Link>
                            </li>
                            <li className='header__row_location location'>
                                <div className='location__input'>
                                Mohammadpur Bus Stand, Dhaka
                                </div>
                            </li>
                            <li className='header__row_user-panel'>
                                <input 
                                    type='text' 
                                    id='search__panel'
                                    placeholder='Search Food' 
                                    />
                                <button onClick={toggleModalOpen}>{login ? `${login.email}` : 'Login'}</button>
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
            {isOpenModalWindow && <ModalAuth toggleModalOpen={toggleModalOpen}/>}
        </>
    );
};

export default Header;