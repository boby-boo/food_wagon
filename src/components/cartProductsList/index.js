/* eslint-disable prettier/prettier */
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import {
    addToCart,
    removeFromCart,
    removeItem,
} from '../../reducers/cartSlice';
import { dataOfCart } from '../../reducers/selectors';
import { BtnMinusIcon, BtnPlusIcon } from '../icons';

const CartProductsList = () => {
    const cartData = useSelector(dataOfCart);
    const dispatch = useDispatch();

    return (
        <ul className="cart__row">
            <AnimatePresence mode="sync">
                {cartData.map(item => {
                    const { name, id, image, weight, quantity, price } = item,
                        src = require(`../../resources/${image}`),
                        nameWithPath = image
                            .match(/\/([^/]+)\//)[1]
                            .replace(/_/g, '-');

                    return (
                        <motion.li
                            key={id}
                            className="cart__card card"
                            initial={{ opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.97, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Link
                                className="card__info"
                                to={`/restaurant/${nameWithPath}/${id}`}
                            >
                                <div className="card__image">
                                    <img src={src} alt={name} />
                                </div>
                                <div className="card__description">
                                    <h2>{name}</h2>
                                    <span>{weight} g</span>
                                </div>
                            </Link>
                            <div className="card__controls">
                                <div className="card__controls_btns">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            dispatch(removeFromCart(item))
                                        }
                                    >
                                        <BtnMinusIcon className="cart-btn" />
                                    </button>
                                    <span>{quantity}</span>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            dispatch(
                                                addToCart({
                                                    ...item,
                                                    quantity: 1,
                                                }),
                                            )
                                        }
                                    >
                                        <BtnPlusIcon className="cart-btn" />
                                    </button>
                                </div>
                                <div className="card__controls_price">
                                    ${price.toFixed(2)}
                                </div>
                                <button
                                    type="button"
                                    onClick={() => dispatch(removeItem(item))}
                                    className="card__controls_remove"
                                ></button>
                            </div>
                        </motion.li>
                    );
                })}
            </AnimatePresence>
        </ul>
    );
};

export default CartProductsList;
