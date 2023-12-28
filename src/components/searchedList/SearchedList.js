import React from 'react';
import RestaurantItemCard from '../restaurantItemCard/RestaurantItemCard';
import Spinner from '../spinner/Spinner';

import { useSelector } from 'react-redux';

import './searchedList.scss';

const SearchedList = () => {
    const dataCards = useSelector(state => state.filteredProducts);

    if (dataCards?.length === 0 || !dataCards) {
        return (
            <section className='searched-list'>
                    <div className="container">
                        <div className='searched-list__empty'>
                            <h1>No such product found</h1>
                            <Spinner />
                        </div>
                    </div>
                <div className="overlay"></div>
            </section>
        )
    }
    
    return (
        <>
            <section className='searched-list'>
                <div className="container">
                    <RestaurantItemCard />
                    <button>MORE</button>
                </div>
                <div className="overlay"></div>
            </section>
        </>
    );
};

export default SearchedList;