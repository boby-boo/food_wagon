import React from 'react';

import { motion } from 'framer-motion'
import './banner.scss';

const Banner = () => {
    return (
        <motion.section 
            className='banner'
            initial={{ opacity: 0 }}
            viewport={{ amount: 0.1 }}
            whileInView={{ opacity: 1}}>
            <div className='container'>
                <div className='banner__row'>
                    <h2>Are you ready to order with the best deals?</h2>
                    <button className='restaurants__button'>Proceed to order</button>
                </div>
            </div>
        </motion.section>
    );
};

export default Banner;