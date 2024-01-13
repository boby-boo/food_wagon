import React, { useRef, useEffect } from 'react';

import './input.scss';

const Input = ({
    elementType,
    elementName,
    valueElement,
    handleChange,
    userData,
    icon,
}) => {
    const labelRef = useRef();

    const style = {
        backgroundColor: '#FFB30E1A',
        boxShadow: '-1px 1px 13px 0px #FFB30E80',
        borderRadius: '6px',
        borderBottom: '1px dashed #0000',
    };

    useEffect(() => {
        if (valueElement && valueElement !== '') {
            labelRef.current.style = `transform: translateY(-260%); color: #FFB30FB3`;
        } else {
            labelRef.current.style = `transform: translateY(-50%); color: #9E9E9E80`;
        }
    }, [valueElement]);

    return (
        <div className="input__inner">
            <div className="input__inner_elements">
                <label
                    ref={labelRef}
                    htmlFor={elementName}
                    className="input__label"
                >
                    {elementName}
                </label>
                <input
                    type={elementType}
                    style={valueElement ? style : null}
                    onChange={handleChange}
                    value={valueElement || ''}
                    name={elementName}
                    id={elementName}
                    className="input__field"
                    required
                />
            </div>
            <div
                onClick={() => labelRef.current.focus()}
                className={`input__icon ${
                    userData[elementName] ? 'animate__color' : null
                }`}
            >
                {icon}
            </div>
        </div>
    );
};

export default Input;
