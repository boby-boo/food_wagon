import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
    deliveryBannerAnimationTextSettings,
    deliveryBannerAnimationFormSettings,
} from '../utils';
import { ReactComponent as IconDelivery } from '../../resources/icons/delivery__icon.svg';
import { ReactComponent as IconPickup } from '../../resources/icons/pickup__icon.svg';

import './deliveryBanner.scss';

const DeliveryBanner = () => {
    const [userMail, setUserMail] = useState('');
    const navigate = useNavigate();

    const handleChange = e => {
        e.stopPropagation();
    };

    const onSubmit = e => {
        e.preventDefault();

        setUserMail('');
        navigate('search/all');
    };

    return (
        <motion.section
            className="delivery-banner"
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.2 }}
        >
            <div className="container">
                <div className="delivery-banner__row">
                    <div className="delivery-banner__row_text">
                        <motion.h1
                            custom={1}
                            variants={deliveryBannerAnimationTextSettings}
                        >
                            Are you starving?
                        </motion.h1>
                        <motion.p
                            custom={2}
                            variants={deliveryBannerAnimationTextSettings}
                        >
                            Within a few clicks, find meals that are accessible
                            near you
                        </motion.p>
                    </div>
                    <motion.form
                        onSubmit={onSubmit}
                        className="delivery-banner__form"
                        custom={3}
                        variants={deliveryBannerAnimationFormSettings}
                    >
                        <div className="delivery-banner__form_top">
                            <div className="input__wrapper">
                                <input
                                    onChange={handleChange}
                                    type="radio"
                                    className="form__top_input-delivery input__delivery"
                                    id="input__delivery"
                                    name="input__delivery"
                                    value="delivery"
                                    defaultChecked
                                />
                                <label
                                    className="form__top_input label__delivery"
                                    htmlFor="input__delivery"
                                >
                                    <IconDelivery className="icon input__delivery_icon" />
                                    Delivery
                                </label>
                            </div>
                            <div className="input__wrapper">
                                <input
                                    onChange={handleChange}
                                    type="radio"
                                    className="form__top_input-pickup"
                                    id="input__pickup"
                                    name="input__delivery"
                                    value="pickup"
                                />
                                <label
                                    className="form__top_input"
                                    htmlFor="input__pickup"
                                >
                                    <IconPickup className="icon input__delivery_icon" />
                                    Pickup
                                </label>
                            </div>
                        </div>
                        <div className="delivery-banner__form_bottom">
                            <input
                                onChange={e => setUserMail(e.target.value)}
                                value={userMail}
                                type="email"
                                required
                                placeholder="Enter Your Address"
                            />
                            <button>Find Food</button>
                        </div>
                    </motion.form>
                </div>
            </div>
        </motion.section>
    );
};

export default DeliveryBanner;
