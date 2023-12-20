import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart, removeItem } from '../../actions';

import { Link } from 'react-router-dom';

import './cart.scss';

const Cart = () => {
    const [totalPrice, setTotalPrice] = useState(0);

    const cart = useSelector(state => state.cart);
    const dispatch = useDispatch();

    useEffect(() => {
        const price = cart.reduce((acc, currPrice) => acc + (currPrice.price * currPrice.quantity), 0).toFixed(2);
        setTotalPrice(price)
    }, [cart])
    
    if (cart.length === 0) {
        return (
            <div className='cart__empty'>
                <p>Cart is empty, add something from the menu</p>
                <Link to='/' className='cart__button'>
                    Select products
                </Link>
            </div>
        )
    }

    return (
        <section className='cart'>
            <div className="container">
                <h1>Order</h1>
                <div className="order__row">
                    <ul className="cart__row">
                        {cart.map(item => {
                        const {name, id, image, weight, quantity, price} = item;
                        const src = require(`../../resources/${image}`)
                            return (
                                <li 
                                    className="cart__card card"
                                    key={id}>
                                    <div className="card__info">
                                        <div className="card__image">
                                            <img src={src} alt={name} />
                                        </div>
                                        <div className="card__description">
                                            <h2>{name}</h2>
                                            <span>{weight} g</span>
                                        </div>
                                    </div>
                                    <div className="card__controls">
                                        <div className="card__controls_btns">
                                            <button onClick={() => dispatch(removeFromCart(item))}>
                                                -
                                            </button>
                                            <span>{quantity}</span>
                                            <button onClick={() => dispatch(addToCart(item))}>
                                                +
                                            </button>
                                        </div>
                                        <div className="card__controls_price">
                                            ${price.toFixed(2)}
                                        </div>
                                        <button
                                            onClick={() => dispatch(removeItem(item))}
                                            className="card__controls_remove">
                                            X
                                        </button>
                                    </div>
                                </li>
                                )
                        })}
                    </ul>
                    <div className="order__info">
                        <h2>Total price: ${totalPrice}</h2>
                        <span className="order__info_quantity">Product: {cart.length} qty</span>
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