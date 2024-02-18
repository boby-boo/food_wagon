import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button, Input } from '../index';
import FoodWagonService from '../../services/FoodWagonService';
import { userLogin } from '../../reducers/userSlice';
import { PasswordIcon, EmailIcon } from '../icons';

const ModalAuth = ({ toggleModalOpen }) => {
    const [userData, setUserData] = useState(
        JSON.parse(localStorage.getItem('user')) || {
            email: '',
            password: '',
        },
    );

    const [isLoginError, setIsLoginError] = useState(true);
    const { getUser } = FoodWagonService();
    const dispatch = useDispatch();

    useEffect(() => {
        const intervalId = setInterval(() => {
            setIsLoginError(true);
        }, 3000);

        return () => clearInterval(intervalId);
    }, [isLoginError]);

    const onsubmitForm = async e => {
        e.preventDefault();

        const user = { ...userData };
        const res = await getUser(JSON.stringify(user));

        if (res) {
            dispatch(userLogin(res));
            setUserData('');
            toggleModalOpen();
            setIsLoginError(true);
        } else {
            setIsLoginError(false);
        }
    };

    return (
        <motion.div
            className="modal__auth"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
        >
            <form className="form" onSubmit={onsubmitForm}>
                <AnimatePresence mode="popLayout">
                    {!isLoginError && (
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.2 }}
                            className="modal__auth_error"
                        >
                            The user name and password provided do not
                            correspond to any account at Food Wagon
                        </motion.p>
                    )}
                </AnimatePresence>
                <h2>
                    Log in to <span>your</span> account
                </h2>
                <Input
                    elementType="email"
                    elementName="email"
                    onChangeFunction={setUserData}
                    valueElement={userData.email}
                    userData={userData}
                    icon={<EmailIcon />}
                />
                <Input
                    elementType="password"
                    elementName="password"
                    onChangeFunction={setUserData}
                    valueElement={userData.password}
                    userData={userData}
                    icon={<PasswordIcon />}
                />
                <Button
                    text="Sign in"
                    onclickFunction={null}
                    isDisabled={false}
                    classNameComponent="restaurants__button"
                    type="submit"
                />
                <div className="form__footer">
                    Need an account?
                    <span>
                        <Link to="/signup" onClick={toggleModalOpen}>
                            Register
                        </Link>
                    </span>
                </div>
            </form>
            <div
                className="modal__auth_overlay"
                onClick={toggleModalOpen}
            ></div>
        </motion.div>
    );
};

export default ModalAuth;
