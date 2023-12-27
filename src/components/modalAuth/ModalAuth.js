import React, { useRef, useState } from 'react';
import { useHttp } from '../../hooks/http.hook';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch } from 'react-redux';
import { userLogin } from '../../actions/index';
import { Link } from 'react-router-dom';

import './modalAuth.scss';

const ModalAuth = ({ toggleModalOpen }) => {
    const [userData, setUserData] = useState('');

    const   passwordRef = useRef(),
            emailRef = useRef();

    const dispatch = useDispatch();
    const { request } = useHttp();

    const handleChange = (e) => {
        const   value = e.target.value,
                target = e.target.id;
        let refElement;

        setUserData({
            ...userData,
            [target]: value
        })

        switch (target) {
            case 'email':
                refElement = emailRef;
                break;
            case 'password': 
                refElement = passwordRef;
                break;
            default: 
            refElement = 'password';
        }

        if (value === '') {
            refElement.current.style = `transform: translateY(-50%); color: #9E9E9E80`;
            return;
        }
        refElement.current.style = `transform: translateY(-230%); color: #FFB30E`;
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

    const style = {
        'backgroundColor': '#FFB30E1A',
        'boxShadow': '-1px 1px 13px 0px #FFB30E80',
        'borderRadius': '6px',
        'borderBottom': '1px dashed #0000'
    }
    
    return (
        <div className='modal__auth'>
            <form className='form' onSubmit={onsubmitForm}>
                <h2>Log in to <span>your</span> account</h2>
                <div className='input__inner'>
                    <div className='input__inner_elements'>
                        <label ref={emailRef} htmlFor='email' className='input__label_email'>Email</label>
                        <input
                            style={userData.email ? style : null}
                            className='input__field' 
                            type='email'
                            onChange={handleChange}
                            id='email'  
                            required />
                    </div>
                    <div className={`input__icon ${userData.email ? 'animate__color' : null}`}>
                        <svg width='16' height='19' viewBox='0 0 16 19' fill='none' xmlns='http://www.w3.org/2000/svg'>
                            <path d='M8 9.25C10.4609 9.25 12.5 7.24609 12.5 4.75C12.5 2.28906 10.4609 0.25 8 0.25C5.50391 0.25 3.5 2.28906 3.5 4.75C3.5 7.24609 5.50391 9.25 8 9.25ZM11.1289 10.375H10.5312C9.75781 10.7617 8.91406 10.9375 8 10.9375C7.08594 10.9375 6.20703 10.7617 5.43359 10.375H4.83594C2.23438 10.375 0.125 12.5195 0.125 15.1211V16.5625C0.125 17.5117 0.863281 18.25 1.8125 18.25H14.1875C15.1016 18.25 15.875 17.5117 15.875 16.5625V15.1211C15.875 12.5195 13.7305 10.375 11.1289 10.375Z' fill='#9E9E9E'/>
                        </svg>
                    </div>
                </div>
                <div className='input__inner'>
                    <div className='input__inner_elements'>
                        <label ref={passwordRef} htmlFor='password' className='input__label_password'>Password</label>
                        <input 
                            style={userData.password ? style : null}
                            onChange={handleChange}
                            type='password'
                            id='password' 
                            className='input__field'
                            required />
                    </div>
                    <div className={`input__icon ${userData.password ? 'animate__color' : null}`}>
                        <svg xmlns='http://www.w3.org/2000/svg' height='16' width='14' viewBox='0 0 448 512' fill='#9E9E9E'><path d='M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80z'/></svg>
                    </div>
                </div>
                <button className='restaurants__button primary__button'>
                    Sign in
                </button>
                <div className='form__footer'>
                    Need an account?
                    <span>
                        <Link 
                            to='/signup'
                            onClick={toggleModalOpen}>
                            Register</Link>
                    </span>
                </div>
            </form>
            <div 
                className='modal__auth_overlay'
                onClick={toggleModalOpen}></div>
        </div>
    );
};

export default ModalAuth;