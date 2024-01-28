import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';

import './notification.scss';

const Notification = () => {
    const [isVisibleNotifications, isSetVisibleNotifications] = useState(false);
    const [isFirstRender, setIsFirstRender] = useState(true);
    const [duplicateCart, setDuplicateCart] = useState(null);
    const [productName, setIsProductName] = useState('');
    const cart = useSelector(state => state.cart.cart);

    useEffect(() => {
        if (isFirstRender) {
            toggleState(false);
            return;
        }

        cart.forEach((originalObj, index) => {
            originalObj !== duplicateCart[index]
                ? setIsProductName(originalObj.name)
                : null;
        });

        const hasChanges = cart.some((originalObj, index) => {
            const copyObj = duplicateCart[index];
            return originalObj.quantity < copyObj?.quantity;
        });

        if (cart.length < duplicateCart?.length || hasChanges) {
            toggleState(false);
            return;
        }

        toggleState(true);

        const timerId = setTimeout(() => {
            isSetVisibleNotifications(false);
        }, 3000);

        // eslint-disable-next-line consistent-return
        return () => clearTimeout(timerId);
    }, [cart]);

    const toggleState = (visibleState, firstRender = false) => {
        isSetVisibleNotifications(visibleState);
        setDuplicateCart([...cart]);
        setIsFirstRender(firstRender);
    };

    return (
        <AnimatePresence>
            {isVisibleNotifications && (
                <motion.div
                    className="notification"
                    initial={{ opacity: 0, x: -400 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -400 }}
                >
                    <div className="notification__row">
                        <h3>{productName} added to your cart!</h3>
                        <span>
                            go to the <Link to="/cart">cart</Link> and make the
                            order
                        </span>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Notification;
