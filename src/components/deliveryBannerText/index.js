import { motion } from 'framer-motion';
import { deliveryBannerAnimationTextSettings } from '../utils';

const DeliveryBannerText = () => {
    return (
        <div className="delivery-banner__row_text">
            <motion.h1
                custom={1}
                variants={deliveryBannerAnimationTextSettings}
            >
                Are you starving?
            </motion.h1>
            <motion.p custom={2} variants={deliveryBannerAnimationTextSettings}>
                Within a few clicks, find meals that are accessible near you
            </motion.p>
        </div>
    );
};

export default DeliveryBannerText;
