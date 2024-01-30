import { motion } from 'framer-motion';
import DeliveryBannerForm from './DeliveryBannerForm';
import { deliveryBannerAnimationTextSettings } from '../utils';

const DeliveryBanner = () => {
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
                    <DeliveryBannerForm />
                </div>
            </div>
        </motion.section>
    );
};

export default DeliveryBanner;
