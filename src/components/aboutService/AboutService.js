import React from 'react';
import img1 from '../../resources/icons/about__service/about__service_icon-1.svg';
import img2 from '../../resources/icons/about__service/about__service_icon-2.svg';
import img3 from '../../resources/icons/about__service/about__service_icon-3.svg';
import img4 from '../../resources/icons/about__service/about__service_icon-4.svg';

import { motion } from 'framer-motion';
import './aboutService.scss';

const OurService = () => {
    return (
        <motion.section 
            className='about-service'
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1}}
            viewport={{ amount: 0.3 }}>
            <div className='container'>
                <h2 className='primary-title'>How does it work</h2>
                <ul className='about-service__row'>
                    <motion.li className='about-service__row_item row__item'>
                        <div className='row__item_image'>
                            <img src={img1} alt='Select location icon' />
                        </div>
                        <div className='row__item_text'>
                            <h3>Select location</h3>
                            <p>Choose the location where your food will be delivered.</p>
                        </div>
                    </motion.li>
                    <li className='about-service__row_item row__item'>
                        <div className='row__item_image'>
                            <img src={img2} alt='Choose order icon' />
                        </div>
                        <div className='row__item_text'>
                            <h3>Choose order</h3>
                            <p>Check over hundreds of menus to pick your favorite food</p>
                        </div>
                    </li>
                    <li className='about-service__row_item row__item'>
                        <div className='row__item_image'>
                            <img src={img3} alt='Pay advanced icon' />
                        </div>
                        <div className='row__item_text'>
                            <h3>Pay advanced</h3>
                            <p>It's quick, safe, and simple. Select several methods of payment</p>
                        </div>
                    </li>
                    <li className='about-service__row_item row__item'>
                        <div className='row__item_image'>
                            <img src={img4} alt='Enjoy meals icon' />
                        </div>
                        <div className='row__item_text'>
                            <h3>Enjoy meals</h3>
                            <p>Food is made and delivered directly to your home.</p>
                        </div>
                    </li>
                </ul>
            </div>
        </motion.section>
    );
};

export default OurService;