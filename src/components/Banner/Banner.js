import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { bannerAnimationSettings } from '../utils';

const Banner = () => {
    const navigate = useNavigate();

    return (
        <motion.section
            className="banner"
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.3 }}
        >
            <div className="container">
                <div className="banner__row">
                    <motion.h2 variants={bannerAnimationSettings} custom={1}>
                        Are you ready to order with the best deals?
                    </motion.h2>
                    <motion.button
                        type="button"
                        className="restaurants__button"
                        onClick={() => navigate('/cart')}
                        variants={bannerAnimationSettings}
                        custom={2}
                    >
                        Proceed to order
                    </motion.button>
                </div>
            </div>
        </motion.section>
    );
};

export default Banner;
