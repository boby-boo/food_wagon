import React, { useState } from 'react';

import { Link } from 'react-router-dom';
import Input from '../input/Input';
import FoodWagonService from '../../services/FoodWagonService'; 

import './modalAuth.scss';
import { useDispatch } from 'react-redux';
import { userLogin, userLogout } from '../../reducers/userSlice';

const ModalAuth = ({ toggleModalOpen }) => {
    const [userData, setUserData] = useState(JSON.parse(localStorage.getItem('user')) || '');
    const [isAuth, setIsAuth] = useState(JSON.parse(localStorage.getItem('user') ? true : false));
    
    const { getUser } = FoodWagonService();
    const dispatch = useDispatch();

    const handleChange = (e) => {
        const value = e.target.value,
            target = e.target.id;

        setUserData({
            ...userData,
            [target]: value,
        });
    };

    const onsubmitForm = async (e) => {
        e.preventDefault();

        const user = {...userData};

        const res = await getUser(JSON.stringify(user));

        if (res) {
            dispatch(userLogin(res));
            setUserData({});
            toggleModalOpen();
            setIsAuth(true);
        } else {
            return;
        }
    };

    const logoutForm = (e) => {
        e.preventDefault();

        dispatch(userLogout());
        setUserData({});
        toggleModalOpen();
        setIsAuth(false);
    }

    return (
        <div className='modal__auth'>
            <form className='form' onSubmit={onsubmitForm}>
                {isAuth ?
                    <h2>
                        <span>Your </span>account
                    </h2>
                    :
                    <h2>
                        Log in to <span>your</span> account
                    </h2>
                }
                <Input
                    elementType='email'
                    valueElement={userData.email}
                    handleChange={handleChange}
                    userData={userData}
                    icon={
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            height='16'
                            width='16'
                            viewBox='0 0 512 512'
                            fill='#9E9E9E'
                        >
                            <path d='M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z' />
                        </svg>
                    }
                />

                <Input
                    elementType='password'
                    valueElement={userData.password}
                    handleChange={handleChange}
                    userData={userData}
                    icon={
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            height='16'
                            width='14'
                            viewBox='0 0 448 512'
                            fill='#9E9E9E'
                        >
                            <path d='M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80z' />
                        </svg>
                    }
                />
                {isAuth 
                    ?
                    <button 
                        onClick={logoutForm}
                        className='restaurants__button primary__button'>
                        Log out
                    </button> 
                    :
                    <button className='restaurants__button primary__button'>
                        Sign in
                    </button>
                }

                <div className='form__footer'>
                    Need an account?
                    <span>
                        <Link to='/signup' onClick={toggleModalOpen}>
                            Register
                        </Link>
                    </span>
                </div>
            </form>
            <div
                className='modal__auth_overlay'
                onClick={toggleModalOpen}>
            </div>
        </div>
    );
};

export default ModalAuth;
