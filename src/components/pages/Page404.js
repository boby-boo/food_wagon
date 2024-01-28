import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './page404.scss';

const textAnimation = {
    hidden: {
        y: -100,
        opacity: 0,
    },
    visible: custom => ({
        y: 0,
        opacity: 1,
        transition: { delay: custom * 0.2 },
    }),
};

const Page404 = () => {
    return (
        <motion.section
            className="error-page"
            initial="hidden"
            whileInView="visible"
        >
            <div className="container">
                <div className="error-page__row">
                    <motion.h1 variants={textAnimation} custom={1}>
                        Oops! Page not found
                    </motion.h1>
                    <motion.div variants={textAnimation} custom={2}>
                        <Link to="/"> Go to main page </Link>
                    </motion.div>
                    <ErrorMessage variants={textAnimation} custom={3} />
                </div>
            </div>
        </motion.section>
    );
};

export default Page404;
