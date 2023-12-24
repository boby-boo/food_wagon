import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

import logo__icon from '../../resources/icons/foodwagon__logo.svg';
import ModalAuth from '../modalAuth/ModalAuth';
import { useHttp } from '../../hooks/http.hook';
import { useNavigate } from "react-router-dom";
import { updateFilteredProducts } from '../../actions/index';
import { useSelector, useDispatch } from 'react-redux';

import './header.scss'

const Header = () => {
    const [data, setData] = useState(null);
    const [isOpenModalWindow, setIsOpenModalWindow] = useState(false);
    const [value, setValue] = useState('');

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


    const handleChange = (e) => {
        const value = e.target.value;

        if (value === '') {
            dispatch(updateFilteredProducts(null))
            setValue('');
            navigate('/');
            return;
        }

        setValue(value);

        const filteredData = data.filter(item => item.name.toLowerCase().includes(value.toLowerCase()));
        dispatch(updateFilteredProducts(filteredData));
        navigate('/search')
    }
    

    if (isOpenModalWindow) {
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
                                onChange={handleChange}
                                value={value}
                                id='search__panel'
                                placeholder='Search Food' 
                            />
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