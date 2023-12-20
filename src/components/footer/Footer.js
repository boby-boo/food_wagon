import React, { useRef } from 'react';
import { Link } from 'react-router-dom';

import './footer.scss';

const Footer = () => {
    const listRef = useRef();

    const handleClick = (e) => {
        console.log(window.innerWidth)
        if (e.target.tagName === 'H3' && window.innerWidth <= 1200) {
            const display = e.target.nextElementSibling.style.display;
    
            if (display === 'flex') {
                e.target.nextElementSibling.style.display = 'none';
                return;
            }
    
            Array.from(listRef.current.children).forEach(i => i.children[1].style.display = 'none')
            e.target.nextElementSibling.style.display = 'flex';

        }
    }
    
    return (
        <footer className='footer'>
            <div className="container">
                <div className="footer__row">
                    <div className="footer__main">
                        <ul 
                            className="footer__main_about-list" 
                            onClick={handleClick}
                            ref={listRef}>
                            <li>
                                <h3>Company</h3>
                                <ul>
                                    <li>
                                        <Link to='/'>About us</Link>
                                    </li>
                                    <li>
                                        <Link to='/'>Team</Link>
                                    </li>
                                    <li>
                                        <Link to='/'>Careers</Link>
                                    </li>
                                    <li>
                                        <Link to='/'>Blog</Link>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <h3>Contact</h3>
                                <ul>
                                    <li>
                                        <Link to='/'>Help & Support</Link>
                                    </li>
                                    <li>
                                        <Link to='/'>Partner with us</Link>
                                    </li>
                                    <li>
                                        <Link to='/'>Ride with us</Link>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <h3>Legal</h3>
                                <ul>
                                    <li>
                                        <Link to='/'>Terms & Conditions</Link>
                                    </li>
                                    <li>
                                        <Link to='/'>Refund & Cancellation</Link>
                                    </li>
                                    <li>
                                        <Link to='/'>Privacy Policy</Link>
                                    </li>
                                    <li>
                                        <Link to='/'>Cookie Policy</Link>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                        <div className="footer__main_subscribe">
                            <div className="footer__social">
                                <h3>Follow Us</h3>
                                <ul className="footer__social_row">
                                    <li>
                                        <Link to='https://instagram.com' target='_blank'>
                                            <svg className='footer__social_row_icon' width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M11.5 5.60938C8.5 5.60938 6.10938 8.04688 6.10938 11C6.10938 14 8.5 16.3906 11.5 16.3906C14.4531 16.3906 16.8906 14 16.8906 11C16.8906 8.04688 14.4531 5.60938 11.5 5.60938ZM11.5 14.5156C9.57812 14.5156 7.98438 12.9688 7.98438 11C7.98438 9.07812 9.53125 7.53125 11.5 7.53125C13.4219 7.53125 14.9688 9.07812 14.9688 11C14.9688 12.9688 13.4219 14.5156 11.5 14.5156ZM18.3438 5.42188C18.3438 4.71875 17.7812 4.15625 17.0781 4.15625C16.375 4.15625 15.8125 4.71875 15.8125 5.42188C15.8125 6.125 16.375 6.6875 17.0781 6.6875C17.7812 6.6875 18.3438 6.125 18.3438 5.42188ZM21.9062 6.6875C21.8125 5 21.4375 3.5 20.2188 2.28125C19 1.0625 17.5 0.6875 15.8125 0.59375C14.0781 0.5 8.875 0.5 7.14062 0.59375C5.45312 0.6875 4 1.0625 2.73438 2.28125C1.51562 3.5 1.14062 5 1.04688 6.6875C0.953125 8.42188 0.953125 13.625 1.04688 15.3594C1.14062 17.0469 1.51562 18.5 2.73438 19.7656C4 20.9844 5.45312 21.3594 7.14062 21.4531C8.875 21.5469 14.0781 21.5469 15.8125 21.4531C17.5 21.3594 19 20.9844 20.2188 19.7656C21.4375 18.5 21.8125 17.0469 21.9062 15.3594C22 13.625 22 8.42188 21.9062 6.6875ZM19.6562 17.1875C19.3281 18.125 18.5781 18.8281 17.6875 19.2031C16.2812 19.7656 13 19.625 11.5 19.625C9.95312 19.625 6.67188 19.7656 5.3125 19.2031C4.375 18.8281 3.67188 18.125 3.29688 17.1875C2.73438 15.8281 2.875 12.5469 2.875 11C2.875 9.5 2.73438 6.21875 3.29688 4.8125C3.67188 3.92188 4.375 3.21875 5.3125 2.84375C6.67188 2.28125 9.95312 2.42188 11.5 2.42188C13 2.42188 16.2812 2.28125 17.6875 2.84375C18.5781 3.17188 19.2812 3.92188 19.6562 4.8125C20.2188 6.21875 20.0781 9.5 20.0781 11C20.0781 12.5469 20.2188 15.8281 19.6562 17.1875Z" fill="#F5F5F5"/>
                                            </svg>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to='https://facebook.com' target='_blank'>
                                            <svg className='footer__social_row_icon' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M23.625 12C23.625 5.57812 18.4219 0.375 12 0.375C5.57812 0.375 0.375 5.57812 0.375 12C0.375 17.8125 4.59375 22.6406 10.1719 23.4844V15.375H7.21875V12H10.1719V9.46875C10.1719 6.5625 11.9062 4.92188 14.5312 4.92188C15.8438 4.92188 17.1562 5.15625 17.1562 5.15625V8.01562H15.7031C14.25 8.01562 13.7812 8.90625 13.7812 9.84375V12H17.0156L16.5 15.375H13.7812V23.4844C19.3594 22.6406 23.625 17.8125 23.625 12Z" fill="#F5F5F5"/>
                                            </svg>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to='https://twitter.com' target='_blank'>
                                            <svg className='footer__social_row_icon' width="24" height="20" viewBox="0 0 24 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M21.5156 5.125C21.5156 5.35938 21.5156 5.54688 21.5156 5.78125C21.5156 12.2969 16.5938 19.75 7.54688 19.75C4.73438 19.75 2.15625 18.9531 0 17.5469C0.375 17.5938 0.75 17.6406 1.17188 17.6406C3.46875 17.6406 5.57812 16.8438 7.26562 15.5312C5.10938 15.4844 3.28125 14.0781 2.67188 12.1094C3 12.1562 3.28125 12.2031 3.60938 12.2031C4.03125 12.2031 4.5 12.1094 4.875 12.0156C2.625 11.5469 0.9375 9.57812 0.9375 7.1875V7.14062C1.59375 7.51562 2.39062 7.70312 3.1875 7.75C1.82812 6.85938 0.984375 5.35938 0.984375 3.67188C0.984375 2.73438 1.21875 1.89062 1.64062 1.1875C4.07812 4.14062 7.73438 6.10938 11.8125 6.34375C11.7188 5.96875 11.6719 5.59375 11.6719 5.21875C11.6719 2.5 13.875 0.296875 16.5938 0.296875C18 0.296875 19.2656 0.859375 20.2031 1.84375C21.2812 1.60938 22.3594 1.1875 23.2969 0.625C22.9219 1.79688 22.1719 2.73438 21.1406 3.34375C22.125 3.25 23.1094 2.96875 23.9531 2.59375C23.2969 3.57812 22.4531 4.42188 21.5156 5.125Z" fill="#F5F5F5"/>
                                            </svg>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="footer__email">
                                <p>Receive exclusive offers in your mailbox</p>
                                <form className="footer__email_form">
                                    <input type="email" placeholder="Enter Your email"/>
                                    <button>
                                        Subscribe
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="footer__bottom">
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

