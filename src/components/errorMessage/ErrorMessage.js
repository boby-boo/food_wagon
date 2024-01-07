import React, { forwardRef } from 'react';

import { motion } from 'framer-motion';
import errorGif from '../../resources/icons/page404.gif';

const ErrorMessage = forwardRef((props, ref) => {
    return (
        <motion.img
            ref={ref}
            style={{ textAlign: 'center', objectFit: 'cover', width: '100%' }}
            src={errorGif}
            alt="Error"
        />
    );
});

export default motion(ErrorMessage);
