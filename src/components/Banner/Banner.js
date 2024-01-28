import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

import './banner.scss';

const textAnimation = {
    hidden: {
        y: 50,
        opacity: 0,
    },
    visible: custom => ({
        y: 0,
        opacity: 1,
        transition: { delay: custom * 0.2 },
    }),
};

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
                    <motion.h2 variants={textAnimation} custom={1}>
                        Are you ready to order with the best deals?
                    </motion.h2>
                    <motion.button
                        className="restaurants__button"
                        onClick={() => navigate('/order')}
                        variants={textAnimation}
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
