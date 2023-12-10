import React, { useEffect, useMemo, useState } from 'react';
import img from '../../resources/images/deal__card_img1.png';
import Slider from 'react-slick';

import { useHttp } from '../../hooks/http.hook';

import './productItem.scss';
import Spinner from '../spinner/Spinner';
import { useParams } from 'react-router-dom';

import PopularItems from '../popularItems/PopularItems';

const ProductItem = () => {
    const [data, setData] = useState(null);
    const [counter, setCounter] = useState(0);
    const {restaurantName, productId} = useParams();

    const { request } = useHttp();

    useEffect(() => {
        request('http://localhost:3001/restaurant')
            .then(res => filteredData(res))
            .then(res => setData(res))
    }, [productId]);

    const filteredData = (data) => {
        try {
            const restaurant = data.filter(restaurant => restaurant.products === restaurantName);
            const product = restaurant[0].data.find(product => product.id === productId);
            return {
                restaurant,
                product
            }
        } catch (e) {
            console.log(e)
        }
    }

    const handleClick = (value) => {
        if (counter === 0 && value === -1) return;

        setCounter(() => counter + value)
    }

    if (!data) {
        return (
            <Spinner/>
        )
    }   

    const renderCard = (data) => {
        console.log('dsscdcd')
        const   {name, id, price, image, weight, ingredients} = data,
                img = require(`../../resources/${image}`),
                ing = ingredients.join(', ');

        return (
            <div className="product__row" key={id}>
            <div className="product__image">
                <img src={img} alt={name}/>
            </div>
            <div className="product__content">
                <div className='product__info'>
                    <h1 className='product__content-title'>{name} <span>({weight}g)</span></h1>
                </div>
                <div className="product__controls">
                    <div className="product__controls_price">${price.toFixed(2)}</div>
                    <div className="product__controls_buttons">
                        <button onClick={() => handleClick(-1)}>-</button>
                        <span>{counter}</span>
                        <button onClick={() => handleClick(+1)}>+</button>
                    </div>
                </div>
                <div className="product__description">
                    <h3>Ingredients:</h3>
                    <p>{ing}</p>
                </div>
                <button className='product__button'>Add to cart</button>
            </div>
            </div>
        )
    }
    
    const content = renderCard(data.product);

    return (
            <section className='product'>
                <div className="container">
                    {content}
                    <div>
                        <h2>Description: </h2>
                        {data.product.description}
                    </div>
                </div>
                <PopularItems/>
            </section>
    );
};

export default ProductItem;