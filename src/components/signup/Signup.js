import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { motion } from 'framer-motion';
import Input from '../input/Input';
import { userLogin } from '../../reducers/userSlice';
import FoodWagonService from '../../services/FoodWagonService';
import { ReactComponent as UserIcon } from '../../resources/icons/user__icon.svg';
import { ReactComponent as EmailIcon } from '../../resources/icons/email__icon.svg';
import { ReactComponent as PasswordIcon } from '../../resources/icons/password__icon.svg';

import './signup.scss';

const Signup = () => {
    const [userData, setUserData] = useState('');
    const { postUser } = FoodWagonService();
    const dispatch = useDispatch();

    const handleChange = e => {
        const { value, name } = e.target;

        setUserData({
            ...userData,
            [name]: value,
        });
    };

    const onsubmitForm = e => {
        e.preventDefault();

        const user = {
            id: uuidv4(),
            ...userData,
        };

        postUser(JSON.stringify(user));
        dispatch(userLogin(user));

        setUserData({});
    };

    return (
        <motion.section
            className="signup"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
        >
            <div className="container">
                <form onSubmit={onsubmitForm} className="signup__form">
                    <h1>PERSONAL DETAILS</h1>
                    <Input
                        elementType="login"
                        valueElement={userData.login}
                        handleChange={handleChange}
                        userData={userData}
                        icon={<UserIcon />}
                    />

                    <Input
                        elementType="email"
                        valueElement={userData.email}
                        handleChange={handleChange}
                        userData={userData}
                        icon={<EmailIcon />}
                    />

                    <Input
                        elementType="password"
                        valueElement={userData.password}
                        handleChange={handleChange}
                        userData={userData}
                        icon={<PasswordIcon />}
                    />
                    <button className="restaurants__button primary__button">
                        REGISTER
                    </button>
                </form>
            </div>
        </motion.section>
    );
};

export default Signup;
