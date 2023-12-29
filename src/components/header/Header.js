import { useState } from 'react';
import logo__icon from '../../resources/icons/foodwagon__logo.svg';

import ModalAuth from '../modalAuth/ModalAuth';

import { useNavigate, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { searchingState } from '../../actions/index';

import './header.scss'

const Header = () => {
    const [value, setValue] = useState('');
    const [isOpenModalWindow, setIsOpenModalWindow] = useState(false);

    const login = useSelector(state => state.login);
    const cart = useSelector(state => state.cart);
    const location = useLocation();
    
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const toggleModalOpen = () => {
        setIsOpenModalWindow(!isOpenModalWindow)
    }

    const handleClick = () => {
        setValue('');
        dispatch(searchingState('', true));
    }

    const handleChange = (e) => {
        const valueTarget = e.target.value;

        if (valueTarget === '') { 
            setValue('');
            dispatch(searchingState('', true));
            return;
        }

        setValue(valueTarget);
        dispatch(searchingState(valueTarget, false));
    }

    const handleNavigate = () => {
        console.log()
        if (location.pathname.search(/search/) === -1 ) navigate('/search/all')
    }
    
    if (isOpenModalWindow) {
        document.body.style.overflow = 'hidden'
    } else {
        document.body.style.overflow = 'visible'
    }

    const border = {
        borderRadius: '10px 0 0 10px'
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
                                    onChange={handleChange}
                                    style={ value ? border : null }
                                    onFocus={handleNavigate}
                                    value={value}
                                    id='search__panel'
                                    placeholder='Search Food' 
                                />
                                {
                                value && 
                                <button onClick={handleClick}></button>
                                }
                            </li>
                            <li className='header__row_user-panel user-panel'>
                                <Link to='/cart' className='user-panel__basket'>
                                    <span>{cart.length}</span>
                                </Link>
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