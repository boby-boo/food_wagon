import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { dataOfUser } from '../../reducers/selectors';
import ModalAuth from '../modalAuth/ModalAuth';

import './privateRoute.scss';

const PrivateRoute = ({ children }) => {
    const [isOpenModalWindow, setIsOpenModalWindow] = useState(true);
    const userData = useSelector(dataOfUser);

    if (userData.name) {
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
