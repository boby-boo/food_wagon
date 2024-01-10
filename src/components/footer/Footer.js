/* eslint-disable no-return-assign */
import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as InstagramIcon } from '../../resources/icons/instagram__icon.svg';
import { ReactComponent as TwitterIcon } from '../../resources/icons/twitter__icon.svg';
import { ReactComponent as FacebookIcon } from '../../resources/icons/facebook__icon.svg';

import './footer.scss';

const Footer = () => {
    const listRef = useRef();

    const handleClick = e => {
        if (e.target.tagName === 'H3' && window.innerWidth <= 1200) {
            // eslint-disable-next-line prefer-destructuring
            const display = e.target.nextElementSibling.style.display;

            if (display === 'flex') {
                e.target.nextElementSibling.style.display = 'none';
                return;
            }

            Array.from(listRef.current.children).forEach(
                // eslint-disable-next-line no-param-reassign
                i => (i.children[1].style.display = 'none'),
            );
            e.target.nextElementSibling.style.display = 'flex';
        }
    };

    const footerContent = [
        {
            title: 'Company',
            items: ['About us', 'Team', 'Careers', 'Blog'],
        },
        {
            title: 'Contact',
            items: ['Help & Support', 'Partner with us', 'Ride with us'],
        },
        {
            title: 'Legal',
            items: [
                'Terms & Conditions',
                'Refund & Cancellation',
                'Privacy Policy',
                'Cookie Policy',
            ],
        },
    ];

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer__row">
                    <div className="footer__main">
                        <ul
                            className="footer__main_about-list"
                            onClick={handleClick}
                            ref={listRef}
                        >
                            {footerContent.map(item => {
                                const { title, items } = item;
                                return (
                                    <li key={title}>
                                        <h3>{title}</h3>
                                        <ul>
                                            {items.map(li => (
                                                <li key={li + title}>
                                                    <Link to="/">{li}</Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </li>
                                );
                            })}
                        </ul>
                        <div className="footer__main_subscribe">
                            <div className="footer__social">
                                <h3>Follow Us</h3>
                                <ul className="footer__social_row">
                                    <li>
                                        <Link
                                            to="https://instagram.com"
                                            target="_blank"
                                        >
                                            <InstagramIcon className="footer__social_row_icon" />
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="https://facebook.com"
                                            target="_blank"
                                        >
                                            <FacebookIcon className="footer__social_row_icon" />
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="https://twitter.com"
                                            target="_blank"
                                        >
                                            <TwitterIcon className="footer__social_row_icon" />
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="footer__email">
                                <p>Receive exclusive offers in your mailbox</p>
                                <form className="footer__email_form">
                                    <input
                                        type="email"
                                        placeholder="Enter Your email"
                                    />
                                    <button>Subscribe</button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="footer__bottom"></div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
