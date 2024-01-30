import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Input from '../input/Input';
import { userLogin } from '../../reducers/userSlice';
import FoodWagonService from '../../services/FoodWagonService';
import { ReactComponent as UserIcon } from '../../resources/icons/user__icon.svg';
import { ReactComponent as EmailIcon } from '../../resources/icons/email__icon.svg';
import { ReactComponent as PasswordIcon } from '../../resources/icons/password__icon.svg';
import { ReactComponent as PhoneIcon } from '../../resources/icons/phone__icon.svg';

const Signup = () => {
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        password: '',
        phone: '',
    });
    const [isValid, setIsValid] = useState(true);
    const [isRegister, setIsRegister] = useState(false);
    const navigate = useNavigate();
    const { postUser } = FoodWagonService();
    const dispatch = useDispatch();

    useEffect(() => {
        const isEmpty =
            Object.values(userData).some(item => item === '') ||
            userData?.phone.length !== 10;

        setIsValid(isEmpty);
    }, [userData]);

    const onsubmitForm = e => {
        e.preventDefault();

        if (userData.phone.length !== 10) return;

        const user = {
            id: uuidv4(),
            ...userData,
            city: '',
            street: '',
            house: '',
            level: '',
            apartment: '',
        };

        setTimeout(() => {
            navigate(-1);
        }, 3000);
        setIsRegister(true);
        postUser(JSON.stringify(user));
        dispatch(userLogin(user));
        setUserData({ name: '', email: '', password: '', phone: '' });
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
                {isRegister ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="signup__form"
                    >
                        <h2 style={{ textAlign: 'center' }}>
                            Register is success
                        </h2>
                    </motion.div>
                ) : (
                    <form onSubmit={onsubmitForm} className="signup__form">
                        <h1>PERSONAL DETAILS</h1>
                        <Input
                            elementType="login"
                            elementName="name"
                            valueElement={userData.name}
                            onChangeFunction={setUserData}
                            userData={userData}
                            icon={<UserIcon />}
                        />
                        <Input
                            elementType="email"
                            elementName="email"
                            valueElement={userData.email}
                            onChangeFunction={setUserData}
                            userData={userData}
                            icon={<EmailIcon />}
                        />
                        <Input
                            elementType="password"
                            elementName="password"
                            valueElement={userData.password}
                            onChangeFunction={setUserData}
                            userData={userData}
                            icon={<PasswordIcon />}
                        />
                        <Input
                            elementType="tel"
                            elementName="phone"
                            valueElement={userData.phone}
                            onChangeFunction={setUserData}
                            userData={userData}
                            icon={<PhoneIcon />}
                        />
                        <button
                            type="submit"
                            disabled={isValid}
                            className="restaurants__button primary__button"
                        >
                            REGISTER
                        </button>
                    </form>
                )}
            </div>
        </motion.section>
    );
};

export default Signup;
