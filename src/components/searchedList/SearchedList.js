import React, { useEffect, useState } from 'react';
import RestaurantItemCard from '../restaurantItemCard/RestaurantItemCard';

import Spinner from '../spinner/Spinner';
import Button from '../button/Button';
import Filter from '../filter/Filter';

import useFoodWagonService from '../../services/FoodWagonService';
import { useDispatch, useSelector } from 'react-redux';
import { filteredProductsData } from '../../reducers/filteredDataSlice';
import { searchedState } from '../../reducers/searchStateSlice';

import { useParams, useNavigate } from 'react-router-dom';

import './searchedList.scss';

const SearchedList = () => {
    const [offset, setOffset] = useState(12);
    const [isLoading, setIsLoading] = useState(false);

    const { getAllProducts } = useFoodWagonService();

    const   dispatch = useDispatch(),
            dataCards = useSelector(state => state.filteredData.filteredData),
            { currentValue, isEmpty } = useSelector(state => state.searchState.searchState),
            { category } = useParams(),
            navigate = useNavigate();
    
    const options = [
        { value: '0', label: 'All' },
        { value: '1', label: 'Pizza' },
        { value: '2', label: 'World' },
        { value: '3', label: 'Sushi' },
        { value: '4', label: 'Taco' },
    ];
    
    useEffect(() => {
        const currentCategory = options.find(item => item.label.toLowerCase() === category).value;
        filterLogic([], currentCategory);
        getProducts()
    },  [currentValue, offset]);

    useEffect(() => {
        setOffset(12)
    }, [category])

    const getProducts = () => {
        setIsLoading(true);

        if (currentValue === '' && isEmpty) {
            setOffset(12)
            const data = {
                currentValue,
                isEmpty: false
            }

            dispatch(searchedState(data))
            // dispatch(searchedState('', false))
        }
        
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

    const filterLogic = (data, value) => {
        let updateCategory
        
        switch (value) {
            case '1':
                updateCategory = 'pizza';
                break;
            case '2':
                updateCategory = 'world';
                break;
            case '3':
                updateCategory = 'sushi';
                break;
            case '4':
                updateCategory = 'taco';
                break;
            default: 
                updateCategory = 'all';
        }

        navigate(`/search/${updateCategory}`);
        getAllProducts(updateCategory, currentValue, offset)
            .then(res => {
                dispatch(filteredProductsData(res));
                setIsLoading(false)
            })
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
                    <div className="searched-list__row">
                        <h1>Search you culinary</h1>
                        <Filter 
                            filterLogic={filterLogic} 
                            options={options}
                            headerText='Culinary style:'
                            currentSelect={category.charAt(0).toUpperCase() + category.slice(1)}
                        />
                    </div>
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