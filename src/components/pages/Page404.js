import React from 'react';
import ErrorMessage from '../errorMessage/ErrorMessage';
import { Link } from 'react-router-dom';

import './page404.scss';

const Page404 = () => {
    return (
        <section className='error-page'>
            <div className='container'>
                <div className='error-page__row'>
                    <h1>Oops! Page not found</h1>
                    <Link to='/'> Go to main page </Link>
                    <ErrorMessage />
                </div>  
            </div>
        </section>
    );
};

export default Page404;