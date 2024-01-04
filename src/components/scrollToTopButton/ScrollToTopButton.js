import React, { useState, useEffect } from 'react';

import './scrollToTopButton.scss';

const ScrollToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return (() => window.removeEventListener('scroll', handleScroll))
    })
    const handleScroll = () => {
        document.documentElement.scrollTop >= 3000 ? setIsVisible(true) : setIsVisible(false);
    }

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return isVisible && <button className='scrollToTopButton' onClick={scrollToTop}></button>
};

export default ScrollToTopButton;