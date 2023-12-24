import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

import logo__icon from '../../resources/icons/foodwagon__logo.svg';
import ModalAuth from '../modalAuth/ModalAuth';
import { useHttp } from '../../hooks/http.hook';
import { useNavigate } from "react-router-dom";
import { filteredProductsData } from '../../actions/index';
import { useSelector, useDispatch } from 'react-redux';

import './header.scss'

const Header = () => {
    const [data, setData] = useState(null);
    const [value, setValue] = useState('as');
    const [isOpenModalWindow, setIsOpenModalWindow] = useState(false);

    const login = useSelector(state => state.login);
    const cart = useSelector(state => state.cart);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { request } = useHttp();

    useEffect(() => {
        request('http://localhost:3001/restaurant')
            .then(res => res.map(item => item.data).flat(Infinity))
            .then(res => setData(res))
    }, []);

    const toggleModalOpen = () => {
        setIsOpenModalWindow(!isOpenModalWindow)
    }

    const handleClick = () => {
        dispatch(filteredProductsData(data));
        setValue('');
    }
    const handleChange = (e) => {
        const valueTarget = e.target.value;

        if (valueTarget === '') { 
            dispatch(filteredProductsData(data));
            setValue('');
            return;
        }

        setValue(valueTarget);

        const filteredData = data.filter(item => item.name.toLowerCase().includes(valueTarget.toLowerCase()));
        dispatch(filteredProductsData(filteredData));
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
                                    style={ value ? border : null}
                                    onFocus={() => {
                                        navigate('/search')
                                        dispatch(filteredProductsData(data));
                                    }}
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