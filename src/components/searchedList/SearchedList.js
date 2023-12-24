import React from 'react';
import RestaurantItemCard from '../restaurantItemCard/RestaurantItemCard';
import Spinner from '../spinner/Spinner';

import {  useSelector } from 'react-redux';

import './searchedList.scss';

const SearchedList = () => {
    const filteredProducts = useSelector(state => state.filteredProducts);

    return (
        <>
            <section className='searched-list'>
                <div className="container">
                    {
                        filteredProducts?.length === 0 || !filteredProducts ?
                        <div className='searched-list__empty'>
                            <h1>No such product found</h1>
                            <Spinner />
                        </div>
                        :
                        <RestaurantItemCard data={filteredProducts} />
                    }
                </div>
                {/* <div 
                    className="overlay" 
                    onClick={handleClick}
                    >
                </div> */}
            </section>
        </>
    );
};

export default SearchedList;