import React from 'react';
import { Link } from 'react-router-dom';
import errorIcon from '../../resources/icons/page404.gif';

import './page404.scss';

const Page404 = () => {
    return (
        <section className='error-page'>
            <div className='container'>
                <div className='error-page__row'>
                    <h1>Oops! Page not found</h1>
                    <img src={errorIcon} alt='pizza icon'/>
                    <Link to='/'> Go to main page </Link>
                </div>  
            </div>
        </section>
    );
};

export default Page404;