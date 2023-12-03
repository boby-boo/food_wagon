import React, { useEffect, useRef } from 'react';

import icon1 from '../../resources/icons/features__row_icon-1.svg';
import icon2 from '../../resources/icons/features__row_icon-2.svg';
import icon3 from '../../resources/icons/features__row_icon-3.svg';
import featuresImage from '../../resources/images/features__image.png';
import googleIcon from '../../resources/icons/google-play__icon.svg';
import appleIcon from '../../resources/icons/apple__icon.svg';

import './featuresApp.scss';

const FeaturesApp = () => {
    const itemsRef = useRef(null);
    
    useEffect(() => {
        const timerId = setInterval(() => {
            selectTiming()
        }, 5000);

        return () => {
            clearInterval(timerId)
        }
    });

    let index = 0;

    function selectTiming() {
        const items = Array.from(itemsRef.current.children);

        items.forEach(item => {
            item.classList.remove('features__row_item-active');
        })

        if (items.length - 1 > index) {
            index ++;
        } else {
            index = 0;
        }
        items[index].classList.add('features__row_item-active');
    }

    return (
        <section className='features'>
            <div className="container__fluid">
                <div className="features__top">
                    <ul className="features__row" ref={itemsRef}>
                        <li className="features__row_item features__row_item-active">
                            <div>
                                <img src={icon1} alt="features icon" />
                                Daily Discounts

                            </div>
                        </li>
                        <li className="features__row_item">
                            <div>
                                <img src={icon2} alt="features icon" />
                                Live Tracing
                            </div>
                        </li>
                        <li className="features__row_item">
                            <div>
                                <img src={icon3} alt="features icon" />
                                Quick Delivery

                            </div>
                        </li>
                    </ul>
                </div>
                <div className="features__bottom">
                    <div className="features__bottom_row">
                        <div className="features__bottom_image">
                            <img src={featuresImage} alt="Featured mobile app" />
                        </div>
                        <div className="features__bottom_content">
                            <div className="features__bottom_content_text">
                                <h2>Install the app</h2>
                                <p>It's never been easier to order food. Look for the finest discounts and you'll be lost in a world of delectable food.
                                </p>
                            </div>
                            <div className="features__bottom_content_buttons content__buttons">
                                <a href='/' className='content__buttons_link'>
                                    <div className='content__buttons_image'>
                                        <img src={googleIcon} alt="Google icon" />
                                    </div>
                                    <div className='content__buttons_description'>
                                        <span>get it on</span>
                                        <h4>google play</h4>
                                    </div>
                                </a>
                                <a href='/' className='content__buttons_link'>
                                    <div className='content__buttons_image'>
                                        <img src={appleIcon} alt="Apple icon" />
                                    </div>
                                    <div className='content__buttons_description'>
                                        <span>Download on the</span>
                                        <h4>app store</h4>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FeaturesApp;