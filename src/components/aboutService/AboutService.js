import React from 'react';
import { motion } from 'framer-motion';

import './aboutService.scss';

const OurService = () => {
    const items = [
        {
            title: 'Select location',
            description:
                'Choose the location where your food will be delivered.',
        },
        {
            title: 'Choose order',
            description:
                'Check over hundreds of menus to pick your favorite food',
        },
        {
            title: 'Pay advanced',
            description:
                'It`s quick, safe, and simple. Select several methods of payment',
        },
        {
            title: 'Enjoy meals',
            description: 'Food is made and delivered directly to your home.',
        },
    ];
    return (
        <motion.section
            className="about-service"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ amount: 0.3 }}
        >
            <div className="container">
                <h2 className="primary-title">How does it work</h2>
                <ul className="about-service__row">
                    {items.map((item, index) => {
                        const { title, description } = item,
                            image = require(
                                `../../resources/icons/about__service/about__service_icon-${
                                    index + 1
                                }.svg`,
                            );
                        return (
                            <li
                                key={index}
                                className="about-service__row_item row__item"
                            >
                                <div className="row__item_image">
                                    <img src={image} alt="Choose order icon" />
                                </div>
                                <div className="row__item_text">
                                    <h3>{title}</h3>
                                    <p>{description}</p>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </motion.section>
    );
};

export default OurService;
