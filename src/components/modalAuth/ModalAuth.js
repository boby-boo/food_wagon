import React, { useState } from 'react';
import { useHttp } from '../../hooks/http.hook';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch } from 'react-redux';
import { userLogin } from '../../actions/index';

import './modalAuth.scss';

const ModalAuth = ({ toggleModalOpen }) => {
    const [userData, setUserData] = useState('');

    const dispatch = useDispatch();
    const { request } = useHttp();

    const handleChange = (e) => {
        const   value = e.target.value,
                target = e.target.id;

        setUserData({
            ...userData,
            [target]: value
        })
    }

    const onsubmitForm = (e) => {
        e.preventDefault()
        
        const user = {
            id: uuidv4(),
            ...userData
        }

        dispatch(userLogin(user));
        localStorage.setItem('user', JSON.stringify(user));
        request('http://localhost:3001/users', 'POST', JSON.stringify(user));
        
        setUserData({});
        toggleModalOpen();
    }

    return (
        <div className='modal__auth'>
            <form onSubmit={onsubmitForm}>
                <div>
                    <input 
                        onChange={handleChange}
                        type="email"
                        id="email"  
                        className='modal__auth_login' 
                        placeholder='Enter you email'
                        required/>
                </div>
                <div>
                    <input 
                        onChange={handleChange}
                        type="password"
                        id="password" 
                        className='modal__auth_password' 
                        placeholder='Enter you password' 
                        required/>
                </div>
                <button>
                    enter
                </button>
            </form>
            <div 
                className='modal__auth_overlay'
                onClick={toggleModalOpen}
            ></div>
        </div>
    );
};

export default ModalAuth;