import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    DailyDiscounts,
    LiveTracing,
    QuickDelivery,
    FeaturesImage,
    GoogleIcon,
    AppleIcon,
} from '../icons';

const FeaturesApp = () => {
    const itemsRef = useRef(null);

    useEffect(() => {
        const timerId = setInterval(() => {
            selectTiming();
        }, 5000);

        return () => {
            clearInterval(timerId);
        };
    });

    let index = 0;

    const selectTiming = () => {
        const items = Array.from(itemsRef.current?.children);

        if (!items) return;

        items.forEach(item => {
            item.classList.remove('features__row_item-active');
        });

        if (items.length - 1 > index) {
            index++;
        } else {
            index = 0;
        }
        items[index].classList.add('features__row_item-active');
    };

    return (
        <motion.section
            className="features"
            initial={{ opacity: 0 }}
            viewport={{ amount: 0.1 }}
            whileInView={{ opacity: 1 }}
        >
            <div className="container__fluid">
                <div className="features__top">
                    <ul className="features__row" ref={itemsRef}>
                        <li className="features__row_item features__row_item-active">
                            <div>
                                <img src={DailyDiscounts} alt="features icon" />
                                Daily Discounts
                            </div>
                        </li>
                        <li className="features__row_item">
                            <div>
                                <img src={LiveTracing} alt="features icon" />
                                Live Tracing
                            </div>
                        </li>
                        <li className="features__row_item">
                            <div>
                                <img src={QuickDelivery} alt="features icon" />
                                Quick Delivery
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="features__bottom">
                    <div className="features__bottom_row">
                        <div className="features__bottom_image">
                            <img
                                src={FeaturesImage}
                                alt="Featured mobile app"
                            />
                        </div>
                        <div className="features__bottom_content">
                            <div className="features__bottom_content_text">
                                <h2>Install the app</h2>
                                <p>
                                    It&apos;s never been easier to order food.
                                    Look for the finest discounts and
                                    you&apos;ll be lost in a world of delectable
                                    food.
                                </p>
                            </div>
                            <div className="features__bottom_content_buttons content__buttons">
                                <Link
                                    to="https://play.google.com"
                                    target="_blank"
                                    className="content__buttons_link"
                                >
                                    <div className="content__buttons_image">
                                        <img
                                            src={GoogleIcon}
                                            alt="Google icon"
                                        />
                                    </div>
                                    <div className="content__buttons_description">
                                        <span>get it on</span>
                                        <h4>google play</h4>
                                    </div>
                                </Link>
                                <Link
                                    to="https://www.apple.com"
                                    target="_blank"
                                    className="content__buttons_link"
                                >
                                    <div className="content__buttons_image">
                                        <img src={AppleIcon} alt="Apple icon" />
                                    </div>
                                    <div className="content__buttons_description">
                                        <span>Download on the</span>
                                        <h4>app store</h4>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.section>
    );
};

export default FeaturesApp;
