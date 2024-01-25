import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

import './flashDeals.scss';

const FlashDeals = () => {
    const items = [
        {
            name: 'Greys Vage',
            description: '6 Days Remaining',
            discount: 15,
        },
        {
            name: 'Greys Vage',
            description: '6 Days Remaining',
            discount: 10,
        },
        {
            name: 'Greys Vage',
            description: '7 Days Remaining',
            discount: 25,
        },
        {
            name: 'Greys Vage',
            description: '8 Days Remaining',
            discount: 20,
        },
    ];
    return (
        <motion.section
            className="flash__deals"
            initial={{ opacity: 0 }}
            viewport={{ amount: 0.3 }}
            whileInView={{ opacity: 1 }}
        >
            <div className="container">
                <ul className="deal__cards_row">
                    {items.map((item, index) => {
                        const { name, description, discount } = item;
                        const image = require(
                            `../../resources/images/deal__card_img${
                                index + 1
                            }.png`,
                        );
                        return (
                            <li
                                key={name + index}
                                className="primary__card deal__card"
                            >
                                <Link to="*">
                                    <div className="primary__card_content deal__card_content card__content">
                                        <div className="primary__card_image">
                                            <img src={image} alt="deal card" />
                                        </div>
                                        <div className="card__content_discount">
                                            {discount}
                                            <div className="card__content_discount-items">
                                                %<span>Off</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="deal__card_description">
                                        <h3>{name}</h3>
                                        <div className="deal__card_description-remaining main__footnote">
                                            {description}
                                        </div>
                                    </div>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </motion.section>
    );
};

export default FlashDeals;
