import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { userLogin } from '../../reducers/userSlice';
import FoodWagonService from '../../services/FoodWagonService';
import { SignupForm } from '../../components';

const SignupPage = () => {
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
                    <SignupForm
                        onsubmitForm={onsubmitForm}
                        userData={userData}
                        setUserData={setUserData}
                        isValid={isValid}
                    />
                )}
            </div>
        </motion.section>
    );
};

export default SignupPage;
