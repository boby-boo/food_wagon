import React from 'react';

import './button.scss';

const Button = ({ text = 'View All', onclickFunction, isDisabled, classNameComponent }) => {
    return (
        <button 
            onClick={onclickFunction} 
            disabled={isDisabled} 
            className={`button ${classNameComponent}`}>
            {text}
        </button>
    );
};

export default Button;