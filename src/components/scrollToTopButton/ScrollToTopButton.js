import React, { useState, useEffect } from 'react';

import { motion, AnimatePresence } from 'framer-motion';
import './scrollToTopButton.scss';

const ScrollToTopButton = ({ scrollTopValue }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return (() => window.removeEventListener('scroll', handleScroll));
    })
    
    const handleScroll = () => {
        document.documentElement.scrollTop >= scrollTopValue ? setIsVisible(true) : setIsVisible(false);
    }

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <AnimatePresence>
        {isVisible && 
            <motion.button 
                className='scrollToTopButton'
                onClick={scrollToTop}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: .4 }}
                whileTap={{ scale: .9 }} 
            >
            </motion.button>}
        </AnimatePresence>
    )
};

export default ScrollToTopButton;