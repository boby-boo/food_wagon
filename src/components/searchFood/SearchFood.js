import React from 'react';

import './searchFood.scss';

import cardImg1 from '../../resources/images/search__food_img1.png';

const SearchFood = () => {
    return (
        <section className='search__food'>
            <div className="container">
                <div className="search__food_content">
                    <h2 className='primary-title'>Search by Food</h2>
                    <div className="search__food_buttons">
                        <button className='search__food_buttons_view'>
                            View All
                        </button>
                        <div className="search__food_buttons_slider">
                            <button className='search__food_buttons_slider__prev_item'></button>
                            <button className='search__food_buttons_slider__next_item'></button>
                        </div>
                    </div>
                </div>
                <div className="search__food_slider">
                    <a className="search__food_card food__card" href="/">
                        <div className="food__card_image">
                            <img src={cardImg1} alt="" />
                        </div>
                        <h3>
                            Pizza
                        </h3>
                    </a>
                </div>
            </div>
        </section>
    );
};

export default SearchFood;