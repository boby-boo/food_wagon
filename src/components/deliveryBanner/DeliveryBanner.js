import React from 'react';

import { motion, useScroll } from 'framer-motion';
import './deliveryBanner.scss';

const textAnimation = {
    hidden: {
        x: -100,
        opacity: 0,
    },
    visible: custom => ({
        x: 0,
        opacity: 1,
        transition: { delay: custom * 0.2 },
    })
}

const formAnimation = {
    hidden: {
        y: 50,
        opacity: 0,
    },
    visible: custom => ({
        y: 0,
        opacity: 1,
        transition: { delay: custom * 0.2 },
    })
};

const DeliveryBanner = () => {
    return (
        <motion.section 
            className='delivery-banner' 
            initial='hidden' 
            whileInView='visible'
            viewport={{ amount: 0.2 }}
            >
            <div className='container'>
                <div className='delivery-banner__row'>
                    <div className='delivery-banner__row_text'>
                        <motion.h1 custom={1} variants={textAnimation}>Are you starving?</motion.h1>
                        <motion.p custom={2} variants={textAnimation}>Within a few clicks, find meals that are accessible near you</motion.p>
                    </div>
                    <motion.form className='delivery-banner__form' custom={3} variants={formAnimation}>
                        <div className='delivery-banner__form_top'>
                            <input type='radio' className='form__top_input-delivery' id='input__delivery' name='input__delivery' value='1'/>
                            <label className='form__top_input' htmlFor='input__delivery'>
                                <svg className='input__delivery_icon' width='24' height='15' viewBox='0 0 24 15' fill='none' xmlns='http://www.w3.org/2000/svg'>
                                    <path d='M19 5C18.5078 5 17.9805 5.10547 17.5234 5.24609L16.3633 3.3125H19.2812C19.7383 3.3125 20.125 2.96094 20.125 2.46875V1.34375C20.125 0.886719 19.7383 0.5 19.2812 0.5H17.6641C17.418 0.5 17.207 0.605469 17.0312 0.78125L15.7305 2.25781L14.9219 0.921875C14.7812 0.675781 14.5 0.5 14.2188 0.5H11.4062C11.0898 0.5 10.8438 0.78125 10.8438 1.0625V1.625C10.8438 1.94141 11.0898 2.1875 11.4062 2.1875H13.7266L14.3945 3.3125H8.98047C8.38281 2.50391 7.43359 1.90625 5.5 1.90625H3.53125C3.07422 1.90625 2.65234 2.29297 2.6875 2.78516C2.6875 3.24219 3.03906 3.59375 3.53125 3.59375H5.5C6.34375 3.59375 6.83594 3.98047 7.15234 4.47266L6.76562 5.21094C6.30859 5.07031 5.81641 5 5.32422 5.03516C2.93359 5.10547 1.03516 7.03906 1 9.39453C0.929688 11.9609 2.96875 14 5.5 14C7.57422 14 9.33203 12.5938 9.85938 10.625H12.8125C13.2695 10.625 13.6562 10.2383 13.6562 9.74609C13.5859 8.09375 14.2539 6.47656 15.625 5.35156L16.0469 6.08984C15.0977 6.93359 14.4648 8.16406 14.5 9.53516C14.5 11.9961 16.5039 14 18.9297 14C21.4609 14.0352 23.5 11.9961 23.5 9.46484C23.4648 7.03906 21.4609 5.03516 19 5ZM5.5 12.3125C3.91797 12.3125 2.6875 11.082 2.6875 9.5C2.6875 7.95312 3.91797 6.6875 5.5 6.6875C5.64062 6.6875 5.78125 6.72266 5.92188 6.72266L4.48047 9.39453C4.16406 9.95703 4.55078 10.625 5.21875 10.625H8.06641C7.60938 11.6445 6.625 12.3125 5.5 12.3125ZM21.7773 9.67578C21.707 11.082 20.5469 12.2422 19.1406 12.3125C17.5234 12.418 16.1875 11.1172 16.1875 9.5C16.1875 8.76172 16.4688 8.09375 16.9609 7.56641L18.6836 10.4844C18.8594 10.7305 19.1758 10.8359 19.457 10.6602L19.9492 10.3789C20.1953 10.2383 20.3008 9.88672 20.125 9.60547L18.4375 6.75781C18.6133 6.72266 18.7891 6.72266 19 6.72266C20.582 6.6875 21.8828 8.05859 21.7773 9.67578Z' fill='#F17228'/>
                                </svg>
                                Delivery
                            </label>
                            <input type='radio' className='form__top_input-pickup' id='input__pickup' name='input__delivery' value='2'/>
                            <label className='form__top_input' htmlFor='input__pickup'>
                            <svg className='input__delivery_icon' width='16' height='19' viewBox='0 0 16 19' fill='none' xmlns='http://www.w3.org/2000/svg'>
                                <path d='M12.375 5.875V4.75C12.375 2.28906 10.3359 0.25 7.875 0.25C5.37891 0.25 3.375 2.28906 3.375 4.75V5.875H0V15.4375C0 17.0195 1.23047 18.25 2.8125 18.25H12.9375C14.4844 18.25 15.75 17.0195 15.75 15.4375V5.875H12.375ZM5.625 4.75C5.625 3.51953 6.60938 2.5 7.875 2.5C9.10547 2.5 10.125 3.51953 10.125 4.75V5.875H5.625V4.75ZM11.25 8.96875C10.7578 8.96875 10.4062 8.61719 10.4062 8.125C10.4062 7.66797 10.7578 7.28125 11.25 7.28125C11.707 7.28125 12.0938 7.66797 12.0938 8.125C12.0938 8.61719 11.707 8.96875 11.25 8.96875ZM4.5 8.96875C4.00781 8.96875 3.65625 8.61719 3.65625 8.125C3.65625 7.66797 4.00781 7.28125 4.5 7.28125C4.95703 7.28125 5.34375 7.66797 5.34375 8.125C5.34375 8.61719 4.95703 8.96875 4.5 8.96875Z' fill='#757575'/>
                            </svg>  
                                Pickup
                            </label>
                        </div>
                        <div className='delivery-banner__form_bottom'>
                            <input type='email' required placeholder='Enter Your Address'/>
                            <button>Find Food</button>
                        </div>
                    </motion.form>
                </div>
            </div>
        </motion.section>
    );
};

export default DeliveryBanner;