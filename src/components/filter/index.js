import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Filter = props => {
    const { data, filterLogic, options, currentSelect, headerText } = props;

    const [selectedValue, setSelectedValue] = useState(currentSelect);
    const [isVisible, setIsVisible] = useState(false);

    const clickHandler = e => {
        setSelectedValue(e.target.textContent);
    };

    const renderItems = arr => {
        const items = arr.map(item => {
            const { value, label } = item;

            return (
                <li
                    onClick={e => {
                        clickHandler(e);
                        setIsVisible(false);
                        filterLogic(data, value);
                    }}
                    key={label}
                    value={value}
                >
                    {label}
                </li>
            );
        });

        return (
            <motion.ul
                className="filter__body"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
            >
                {items}
            </motion.ul>
        );
    };

    const content = renderItems(options);

    return (
        <>
            <div className="filter">
                <div className="filter__header">
                    {headerText}
                    <div
                        className="filter__header_value"
                        onClick={() => setIsVisible(!isVisible)}
                    >
                        {selectedValue}
                        <span className="filter__icon"></span>
                    </div>
                </div>
                <AnimatePresence>{isVisible && content}</AnimatePresence>
            </div>
            {isVisible && (
                <div
                    className="overlay"
                    onClick={() => setIsVisible(false)}
                ></div>
            )}
        </>
    );
};

export default Filter;
