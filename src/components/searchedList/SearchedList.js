import React, { useEffect, useState } from 'react';
import RestaurantItemCard from '../restaurantItemCard/RestaurantItemCard';
import Spinner from '../spinner/Spinner';
import Button from '../button/Button';

import useFoodWagonService from '../../services/FoodWagonService';
import { useDispatch, useSelector } from 'react-redux';
import { filteredProductsData, searchingState } from '../../actions/index';

import './searchedList.scss';
import { useParams } from 'react-router-dom';

const SearchedList = () => {
    const [offset, setOffset] = useState(12);
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();
    const dataCards = useSelector(state => state.filteredProducts);
    const { currentValue, isEmpty } = useSelector(state => state.searchState);
    const { category } = useParams();

    const { getAllProducts } = useFoodWagonService();

    useEffect(() => {
        getProducts()
    },  [currentValue, offset]);

    const getProducts = () => {
        setIsLoading(true);

        if (currentValue === '' && isEmpty) {
            setOffset(12)
            dispatch(searchingState('', false))
        }
        
        // getAllProducts(currentValue, offset)
        getAllProducts(category, currentValue, offset)
            .then(res => {
                dispatch(filteredProductsData(res));
                setIsLoading(false)
            })
    }

    const changeOffset = () => {
        setOffset(prevOffset => prevOffset + 12)
        getProducts()
    }   

    if (dataCards?.length === 0 || !dataCards) {
        return (
            <section className='searched-list'>
                    <div className='container'>
                        <div className='searched-list__empty'>
                            {dataCards && <h1>No such product found</h1>}
                            <Spinner />
                        </div>
                    </div>
                <div className='overlay'></div>
            </section>
        )
    }
    
    return (
        <>
            <section className='searched-list'>
                <div className='container'>
                    <RestaurantItemCard />
                    {
                    dataCards?.length % 12 === 0 &&
                    <Button 
                        classNameComponent='searched-list__btn'
                        isDisabled={isLoading}
                        onclickFunction={changeOffset}
                    />
                    } 
                </div>
            </section>
        </>
    );
};

export default SearchedList;