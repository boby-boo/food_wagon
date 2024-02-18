import { Oval } from 'react-loader-spinner';
import { motion } from 'framer-motion';

const Spinner = () => {
    return (
        <motion.div
            style={{
                display: 'flex',
                justifyContent: 'center',
                padding: '25px',
            }}
            initial={{ opacity: 0 }}
            viewport={{ amount: 0.3 }}
            whileInView={{ opacity: 1 }}
        >
            <Oval
                height={100}
                width={100}
                color="#FFB30E"
                wrapperClass=""
                visible={true}
                ariaLabel="oval-loading"
                secondaryColor="#9E9E9E"
                strokeWidth={3}
                strokeWidthSecondary={2}
            />
        </motion.div>
    );
};

export default Spinner;
