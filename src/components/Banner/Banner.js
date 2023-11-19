import React from 'react';

import './banner.scss';

const Banner = () => {
    return (
        <section className='banner'>
            <div className="container">
                <div className="banner__row">
                    <h2>Are you ready to order with the best deals?</h2>
                    <button className='restaurants__button'>Proceed to order</button>
                </div>
            </div>
        </section>
    );
};

export default Banner;