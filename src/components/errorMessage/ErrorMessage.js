import React from 'react';
import errorGif from '../../resources/icons/page404.gif';

const ErrorMessage = () => {
    return (
        <img style={{ textAlign: 'center', objectFit: 'cover', width: '100%' }} src={errorGif} alt='Error'/>
    );
};

export default ErrorMessage;