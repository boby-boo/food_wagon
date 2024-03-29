import { motion } from 'framer-motion';
import { DeliveryBannerForm, DeliveryBannerText } from '../index';

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
                    <DeliveryBannerText />
                    <DeliveryBannerForm />
                </div>
            </div>
        </motion.section>
    );
};

export default DeliveryBanner;
