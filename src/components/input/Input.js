import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './input.scss';

const Input = ({
    elementType,
    elementName,
    valueElement,
    onChangeFunction,
    userData,
    icon,
}) => {
    const [isInvalid, setIsInvalid] = useState(false);
    const [errorMessage, setErrorMessage] = useState('false');
    const labelRef = useRef();

    useEffect(() => {
        if (valueElement && valueElement !== '') {
            labelRef.current.style = `transform: translateY(-260%); color: #FFB30FB3`;
        } else {
            labelRef.current.style = `transform: translateY(-50%); color: #9E9E9E80`;
        }
    }, [valueElement]);

    useEffect(() => {
        checkValue(elementName, elementType, valueElement);
    }, []);

    const style = {
        backgroundColor: '#FFB30E1A',
        boxShadow: '-1px 1px 13px 0px #FFB30E80',
        borderRadius: '6px',
        borderBottom: '1px dashed #0000',
    };

    const templateErrorMessages = {
        basic: 'is the required field',
        phone: 'must be 10 length symbols',
        email: 'your email must contain symbols @ and .',
    };

    const handleChange = e => {
        const { name, value, type } = e.target;
        checkValue(name, type, value);
    };

    const checkValue = (name, type, value) => {
        if (type === 'tel') {
            const updValue = value.replace(/[^0-9]/g, ' ').trim();

            if (value.length < 10 || value.length > 10) {
                setErrorMessage(`${name} ${templateErrorMessages.phone}`);
                setIsInvalid(true);
            } else {
                setIsInvalid(false);
            }

            onChangeFunction({
                ...userData,
                [name]: updValue,
            });

            return;
        }

        if (type === 'email' && !/@.*\./.test(value)) {
            setErrorMessage(templateErrorMessages.email);
            setIsInvalid(true);
            onChangeFunction({
                ...userData,
                [name]: value,
            });

            return;
        }

        if (!value) {
            setIsInvalid(true);
            setErrorMessage(`${name} ${templateErrorMessages.basic}`);
        } else {
            setIsInvalid(false);
        }

        onChangeFunction({
            ...userData,
            [name]: value,
        });
    };

    const handleBlur = e => {
        const { name, type, value } = e.target;
        checkValue(name, type, value);
    };

    return (
        <div className="input__row">
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
                        onBlur={handleBlur}
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
            <AnimatePresence>
                {isInvalid && (
                    <motion.span
                        className="input__error_message"
                        initial={{ y: -10, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        exit={{ y: -10, opacity: 0 }}
                    >
                        {errorMessage}
                    </motion.span>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Input;
