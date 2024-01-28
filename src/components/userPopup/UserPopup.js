/* eslint-disable no-param-reassign */
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { userLogin } from '../../reducers/userSlice';
import {
    userPopupNavPanelData as navPanel,
    userPopupInputsPersonalData as inputsPersonal,
    userPopupInputsAddressData as inputsAddress,
} from '../constants';
import FoodWagonService from '../../services/FoodWagonService';
import { ReactComponent as RenameIcon } from '../../resources/icons/rename__icon.svg';
import './userPopup.scss';

const UserPopup = ({ toggleModalOpen }) => {
    const [userData, setUserData] = useState(
        JSON.parse(localStorage.getItem('user')),
    );
    const [userOrders, setUserOrders] = useState(null);
    const [activePanel, setActivePanel] = useState('personal__data');
    const [isChanged, setIsChanged] = useState(false);
    const dispatch = useDispatch();
    const { updateUserInfo } = FoodWagonService();
    const popupRef = useRef();
    const mainBlockRef = useRef();
    const personalRefs = [];
    const addressRefs = [];

    useEffect(() => {
        fetch('http://localhost:3001/orders')
            .then(res => res.json())
            .then(res =>
                res.filter(order => order.infoAboutUser.id === userData.id),
            )
            .then(res => setUserOrders(res));

        const handleResize = () => {
            if (
                window.innerWidth > 450 &&
                popupRef.current.style.minHeight === '526px'
            ) {
                popupRef.current.style.removeProperty('min-height');
            }
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        const timerId = setTimeout(() => setIsChanged(false), 3000);

        return () => clearInterval(timerId);
    }, [isChanged]);

    const handleChange = e => {
        const { name, value } = e.target;

        setUserData({
            ...userData,
            [name]: value,
        });
    };

    const toggleDisabled = (index, el = null) => {
        if (el) {
            if (el.name === 'password' && el.type === 'text')
                el.type = 'password';

            el.disabled = true;
        } else {
            const activeRefs =
                activePanel === 'personal__data' ? personalRefs : addressRefs;

            if (activeRefs[index].name === 'password')
                activeRefs[index].type = 'text';

            activeRefs[index].disabled = false;
            activeRefs[index].focus();
        }
    };

    const toggleActivePanel = panel => {
        if (window.innerWidth <= 450) {
            popupRef.current.style.minHeight = '526px';
            mainBlockRef.current.style.display = 'flex';
        }
        setIsChanged(false);
        setActivePanel(panel);
    };

    const saveChanged = () => {
        updateUserInfo(userData.id, JSON.stringify(userData));
        dispatch(userLogin(userData));
        setIsChanged(true);
    };

    const renderItems = (arr, refs) => {
        return arr.map((item, index) => {
            const { name, value, type } = item;
            return (
                <div className="popup__main_inner" key={`${name}${index}`}>
                    <span className="popup__main_name">{name}</span>
                    <div className="popup__main_input-wrapper">
                        <input
                            type={type}
                            onChange={handleChange}
                            onBlur={e => toggleDisabled(null, e.target)}
                            name={name}
                            className="popup__main_input"
                            value={userData[value]}
                            ref={input => refs.push(input)}
                            required
                            disabled={true}
                        />
                        <button>
                            <RenameIcon
                                className="rename__icon"
                                onClick={() => toggleDisabled(index)}
                            />
                        </button>
                    </div>
                </div>
            );
        });
    };

    const renderOrder = arr => {
        if (!arr || arr.length === 0) {
            return <h2>Not orders yet</h2>;
        }

        const items = arr.map(item => {
            const { dateOrder, totalPrice, order } = item;
            const originalDate = new Date(dateOrder);
            const formattedDate = `${originalDate
                .getDate()
                .toString()
                .padStart(2, '0')}-${(originalDate.getMonth() + 1)
                .toString()
                .padStart(
                    2,
                    '0',
                )}-${originalDate.getFullYear()} ${originalDate.toLocaleTimeString(
                [],
                { hour: '2-digit', minute: '2-digit' },
            )}`;

            return (
                <tr key={dateOrder + totalPrice}>
                    <td>{formattedDate}</td>
                    <td>
                        <ul>
                            {order.map(product => {
                                const { name, id, image } = product;
                                const nameWithPath = image
                                    .match(/\/([^/]+)\//)[1]
                                    .replace(/_/g, '-');

                                return (
                                    <li
                                        key={
                                            dateOrder +
                                            totalPrice +
                                            nameWithPath +
                                            name
                                        }
                                    >
                                        <Link
                                            target="_blank"
                                            to={`/restaurant/${nameWithPath}/${id}`}
                                        >
                                            {name}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </td>
                    <td>$ {totalPrice}</td>
                </tr>
            );
        });

        return (
            <table cellSpacing="0">
                <thead>
                    <tr>
                        <th>Order date</th>
                        <th>Products</th>
                        <th>Total price</th>
                    </tr>
                </thead>
                <tbody>{items}</tbody>
            </table>
        );
    };

    const personalItems = renderItems(inputsPersonal, personalRefs);
    const addressItems = renderItems(inputsAddress, addressRefs);
    const ordersItems = renderOrder(userOrders);

    return (
        <>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="popup"
                ref={popupRef}
            >
                <div className="popup__row">
                    <ul className="popup__aside">
                        {navPanel.map((item, index) => {
                            const { id, name, label, value } = item;
                            return (
                                <li
                                    key={`${name}${index}`}
                                    onClick={() => toggleActivePanel(id)}
                                    className="popup__aside_item"
                                >
                                    <input
                                        type="radio"
                                        id={id}
                                        name="user__info"
                                        value={value}
                                        defaultChecked={index === 0}
                                    />
                                    <label htmlFor={id}>{label}</label>
                                </li>
                            );
                        })}
                    </ul>
                    <div
                        className="popup__main"
                        style={{
                            justifyContent:
                                activePanel === 'order-history__data'
                                    ? 'flex-start'
                                    : 'center',
                        }}
                        ref={mainBlockRef}
                    >
                        {activePanel === 'personal__data' && personalItems}
                        {activePanel === 'address__data' && addressItems}
                        {activePanel === 'order-history__data' && ordersItems}
                        {activePanel === 'order-history__data' ? null : (
                            <button
                                className="popup__main_btn"
                                onClick={saveChanged}
                            >
                                Save Changes
                            </button>
                        )}
                        <AnimatePresence>
                            {isChanged && (
                                <motion.span
                                    className="popup__main_notification"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                >
                                    Information was changed
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </motion.div>
            <motion.div
                className="modal__auth_overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={toggleModalOpen}
            ></motion.div>
        </>
    );
};

export default UserPopup;
