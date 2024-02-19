import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import DeliveryBannerInput from '../deliveryBannerInput';
import { IconDelivery, IconPickup } from '../icons';
import { deliveryBannerAnimationFormSettings } from '../utils';

const DeliveryBannerForm = () => {
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
        <motion.form
            onSubmit={onSubmit}
            className="delivery-banner__form"
            variants={deliveryBannerAnimationFormSettings}
            custom={3}
        >
            <div className="delivery-banner__form_top">
                <DeliveryBannerInput
                    onchangeFn={handleChange}
                    name="input__delivery"
                    id="input__delivery"
                    nameClass="-delivery"
                    isChecked={true}
                    value="delivery"
                    labelClass="label__delivery"
                    icon={
                        <IconDelivery className="icon input__delivery_icon" />
                    }
                    text="Delivery"
                />
                <DeliveryBannerInput
                    onchangeFn={handleChange}
                    name="input__delivery"
                    id="input__pickup"
                    nameClass="-pickup"
                    isChecked={false}
                    value="pickup"
                    labelClass=""
                    icon={<IconPickup className="icon input__delivery_icon" />}
                    text="Pickup"
                />
            </div>
            <div className="delivery-banner__form_bottom">
                <input
                    onChange={e => setUserMail(e.target.value)}
                    value={userMail}
                    type="email"
                    required
                    placeholder="Enter Your Address"
                />
                <button type="submit">Find Food</button>
            </div>
        </motion.form>
    );
};

export default DeliveryBannerForm;
