import React from 'react';
import { motion } from 'framer-motion';
import orderCardImage1 from '../../resources/images/order__card_image-1.png';
import orderCardImage2 from '../../resources/images/order__card_image-2.png';
import orderCardImage3 from '../../resources/images/order__card_image-3.png';

import './cardsOfOrders.scss';

const CardsOfOrders = () => {
    return (
        <motion.section
            className="cards-of-orders orders"
            initial={{ opacity: 0 }}
            viewport={{ amount: 0.1 }}
            whileInView={{ opacity: 1 }}
        >
            <div className="container">
                <ul className="orders__row">
                    <li className="orders__row_card order__card">
                        <div className="order__card_description">
                            <div className="order__card_text">
                                <h2 className="primary-title">
                                    Best deals <span>Crispy Sandwiches</span>
                                </h2>
                                <p>
                                    Enjoy the large size of sandwiches. Complete
                                    perfect slice of sandwiches.
                                </p>
                            </div>
                            <button className="primary__button restaurants__button order__card_button">
                                Proceed to order
                            </button>
                        </div>
                        <div className="order__card_image">
                            <img src={orderCardImage1} alt="Order card" />
                        </div>
                    </li>
                    <li className="orders__row_card order__card">
                        <div className="order__card_description">
                            <div className="order__card_text">
                                <h2 className="primary-title">
                                    Celebrate parties with{' '}
                                    <span>Fried Chicken</span>
                                </h2>
                                <p>
                                    Get the best fried chicken smeared with a
                                    lip smacking lemon chili flavor. Check out
                                    best deals for fried chicken.
                                </p>
                            </div>
                            <button className="primary__button restaurants__button order__card_button">
                                Proceed to order
                            </button>
                        </div>
                        <div className="order__card_image">
                            <img src={orderCardImage2} alt="Order card" />
                        </div>
                    </li>
                    <li className="orders__row_card order__card">
                        <div className="order__card_description">
                            <div className="order__card_text">
                                <h2 className="primary-title">
                                    Wanna eat hot & spicy <span>Pizza?</span>
                                </h2>
                                <p>
                                    Pair up with a friend and enjoy the hot and
                                    crispy pizza pops. Try it with the best
                                    deals.
                                </p>
                            </div>
                            <button className="primary__button restaurants__button order__card_button">
                                Proceed to order
                            </button>
                        </div>
                        <div className="order__card_image">
                            <img src={orderCardImage3} alt="Order card" />
                        </div>
                    </li>
                </ul>
            </div>
        </motion.section>
    );
};

export default CardsOfOrders;
