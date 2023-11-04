import React from 'react';

import './popularItems.scss';

import popularImage from '../../resources/images/popular__items-img1.png'; 

const PopularItems = () => {
    return (
        <section className='popular-items'>
            <div className="container">
                <h2 className='primary-title'>Popular items</h2>    
                <ul className="popular-items__row">
                    <li className="popular-item">
                        <div className="popular-item__image">
                            <img src={popularImage} alt="popular food" />
                        </div>
                        <div className="popular-item__description">
                            <h3>Cheese Burger </h3>
                            <div className='popular-item__description_location'>Burger Arena</div>
                            $3.88
                        </div>
                            <button className="popular-item__button">Order Now</button>
                    </li>
                </ul>
            </div>
        </section>
    );
};

export default PopularItems;