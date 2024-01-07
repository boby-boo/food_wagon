import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import ModalAuth from '../modalAuth/ModalAuth';

import './privateRoute.scss';

const PrivateRoute = ({ children }) => {
    const [isOpenModalWindow, setIsOpenModalWindow] = useState(true);
    const user = useSelector(state => state.user.user);

    if (user.login) {
        return { ...children };
    }

    return (
        <>
            <AnimatePresence>
                {isOpenModalWindow && (
                    <ModalAuth
                        toggleModalOpen={() =>
                            setIsOpenModalWindow(!isOpenModalWindow)
                        }
                    />
                )}
            </AnimatePresence>
            {!isOpenModalWindow && (
                <div className="private__inner">
                    <p className="private__text">
                        You need{' '}
                        <span onClick={() => setIsOpenModalWindow(true)}>
                            authorization{' '}
                        </span>
                        or{' '}
                        <span>
                            <Link to="/signup">register</Link>
                        </span>
                    </p>
                </div>
            )}
        </>
    );
};

export default PrivateRoute;
