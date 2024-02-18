import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { ErrorGif } from '../icons';

const ErrorMessage = forwardRef((props, ref) => {
    return (
        <motion.img
            ref={ref}
            style={{ textAlign: 'center', objectFit: 'cover', width: '100%' }}
            src={ErrorGif}
            alt="Error"
        />
    );
});

export default motion(ErrorMessage);
