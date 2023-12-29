import React, { useState } from 'react';

import './filter.scss';

const Filter = (props) => {

    const { data, filterLogic, options, currentSelect, headerText} = props;

    const [selectedValue, setSelectedValue] = useState(currentSelect);
    const [isVisible, setIsVisible] = useState(false);

    const clickHandler = (e) => {
        setSelectedValue(e.target.textContent);
    };

    const renderItems = (arr) => {
        const items = arr.map((item, index) => {
            const { value, label } = item;

            return (
                <li
                    onClick={(e) => {
                        clickHandler(e);
                        setIsVisible(false);
                        filterLogic(data, value);
                    }}
                    key={index}
                    value={value}
                >
                    {label}
                </li>
            );
        });

        return <ul className='filter__body'>{items}</ul>;
    };

    const content = renderItems(options);

    return (
        <>
            <div className='filter'>
                <div className='filter__header'>
                    {headerText}
                    <div
                        className='filter__header_value'
                        onClick={() => setIsVisible(!isVisible)}
                    >
                        {selectedValue}
                        <span className='filter__icon'></span>
                    </div>
                </div>
                {isVisible && content}
            </div>
            {isVisible && (
                <div
                    className='overflow'
                    onClick={() => setIsVisible(false)}
                ></div>
            )}
        </>
    );
};

export default Filter;