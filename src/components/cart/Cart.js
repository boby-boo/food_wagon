import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart, removeItem } from '../../reducers/cartSlice';

import { Link } from 'react-router-dom';

import { motion, AnimatePresence } from 'framer-motion';

import './cart.scss';

const Cart = () => {
    const [totalPrice, setTotalPrice] = useState(0);

    const cart = useSelector(state => state.cart.cart);

    const dispatch = useDispatch();

    useEffect(() => {
        const price = cart.reduce((acc, currPrice) => acc + (currPrice.price * currPrice.quantity), 0).toFixed(2);
        setTotalPrice(price)
    }, [cart])
    
    if (cart.length === 0) {
        return (
            <motion.div 
                className='cart__empty'
                initial={{ opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
            >
                <p>Cart is empty, add something from the menu</p>
                <Link to='/' className='cart__button'>
                    Select products
                </Link>
            </motion.div>
        )
    }

    return (
        <section className='cart'>
            <div className='container'>
                <h1>Order</h1>
                <div className='order__row'>
                    <ul className='cart__row'>
                        <AnimatePresence mode='sync'>
                            {cart.map(item => {
                                const   { name, id, image, weight, quantity, price } = item,
                                        src = require(`../../resources/${image}`),
                                        nameWithPath = image.match(/\/([^\/]+)\//)[1].replace(/\_/g, '-');
                                
                                return (
                                    <motion.li
                                        key={id}
                                        className='cart__card card'
                                        initial={{ opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        exit={{ scale: .97, opacity: 0 }}
                                        transition={{ duration: .3 }}
                                    >
                                        <Link 
                                            className='card__info'
                                            to={`/restaurant/${nameWithPath}/${id}`}
                                        >
                                            <div className='card__image'>
                                                <img src={src} alt={name} />
                                            </div>
                                            <div className='card__description'>
                                                <h2>{name}</h2>
                                                <span>{weight} g</span>
                                            </div>
                                        </Link>
                                        <div className='card__controls'>
                                            <div className='card__controls_btns'>
                                                <button onClick={() => dispatch(removeFromCart(item))}>
                                                    -
                                                </button>
                                                <span>{quantity}</span>
                                                <button onClick={() => dispatch(addToCart(item))}>
                                                    +
                                                </button>
                                            </div>
                                            <div className='card__controls_price'>
                                                ${price.toFixed(2)}
                                            </div>
                                            <button
                                                onClick={() => dispatch(removeItem(item))}
                                                className='card__controls_remove'>
                                            </button>
                                        </div>
                                    </motion.li>
                                )
                            })}
                        </AnimatePresence>  
                    </ul>
                    <div className='order__info'>
                        <h2>Total price: ${totalPrice}</h2>
                        <span className='order__info_quantity'>Product: {cart.length} qty</span>
                        <button className='cart__button'>
                            order
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Cart;