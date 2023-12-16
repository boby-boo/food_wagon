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
    const basket = useSelector(state => state.basket);

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

    if (isOpenModalWindow) {
        console.log(document.body)
        document.body.style.overflow = 'hidden'
    } else {
        document.body.style.overflow = 'visible'
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
                            <li className='header__row_search-panel'>
                                <input 
                                    type='text' 
                                    id='search__panel'
                                    placeholder='Search Food' 
                                    />
                            </li>
                            <li className='header__row_user-panel user-panel'>
                                <button className='user-panel__basket'>
                                    <span>{basket.length}</span>
                                    
                                </button>
                                <button 
                                    onClick={toggleModalOpen}
                                    className='user-panel__login'>
                                    <span>
                                        {login.email?.length > 1 ? `${login.email.substring(0, 10) + '...'}` : 'Login'}
                                    </span>
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