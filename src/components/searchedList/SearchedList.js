import React from 'react';
import RestaurantItemCard from '../restaurantItemCard/RestaurantItemCard';
import Spinner from '../spinner/Spinner';

import { useSelector } from 'react-redux';

import './searchedList.scss';

const SearchedList = () => {
    const dataCards = useSelector(state => state.filteredProducts);

    return (
        <>
            <section className='searched-list'>
                <div className="container">
                    {
                        dataCards?.length === 0 || !dataCards ?
                        <div className='searched-list__empty'>
                            <h1>No such product found</h1>
                            <Spinner />
                        </div>
                        :
                        <RestaurantItemCard />
                    }
                </div>
                <div 
                    className="overlay" 
                    // onClick={handleClick}
                    >
                </div>
            </section>
        </>
    );
};

export default SearchedList;