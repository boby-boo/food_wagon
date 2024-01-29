import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { page404AnimationSettings } from '../utils';
import ErrorMessage from '../errorMessage/ErrorMessage';

const Page404 = () => {
    return (
        <motion.section
            className="error-page"
            initial="hidden"
            whileInView="visible"
        >
            <div className="container">
                <div className="error-page__row">
                    <motion.h1 variants={page404AnimationSettings} custom={1}>
                        Oops! Page not found
                    </motion.h1>
                    <motion.div variants={page404AnimationSettings} custom={2}>
                        <Link to="/"> Go to main page </Link>
                    </motion.div>
                    <ErrorMessage
                        variants={page404AnimationSettings}
                        custom={3}
                    />
                </div>
            </div>
        </motion.section>
    );
};

export default Page404;
