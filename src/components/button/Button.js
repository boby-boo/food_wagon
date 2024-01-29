import { forwardRef } from 'react';
import { motion } from 'framer-motion';

const Button = forwardRef(
    (
        { text = 'View All', onclickFunction, isDisabled, classNameComponent },
        ref,
    ) => {
        return (
            <button
                ref={ref}
                onClick={onclickFunction}
                disabled={isDisabled}
                className={`button ${classNameComponent}`}
            >
                {text}
            </button>
        );
    },
);

export default motion(Button);
