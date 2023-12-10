import React, { useEffect, useState } from 'react';
import img from '../../resources/images/deal__card_img1.png';
import Slider from 'react-slick';

import { useHttp } from '../../hooks/http.hook';

import './productItem.scss';
import Spinner from '../spinner/Spinner';
import { useParams } from 'react-router-dom';

const ProductItem = () => {
    const [product, setProduct] = useState(null);
    const [counter, setCounter] = useState(0);
    const {restaurantName, productId} = useParams();

    const { request } = useHttp();

    useEffect(() => {
        request('http://localhost:3001/restaurant')
            .then(res => filteredData(res))
            .then(res => setProduct(res))
    }, []);

    const filteredData = (data) => {
        try {
            const restaurant = data.filter(restaurant => restaurant.products === restaurantName)[0]
                                    .data.find(product => product.id ===  productId);
            console.log(restaurant)
            return restaurant
        } catch (e) {
            console.log(e)
        }
    }

    const handleClick = (value) => {
        if (counter === 0 && value === -1) return;

        setCounter(() => counter + value)
    }
    if (!product) {
        return (
            <Spinner/>
        )
    }   

    const renderCard = (data) => {
        const   {name, id, price, image, weight, ingredients} = data,
                img = require(`../../resources/${image}`),
                ing = ingredients.join(' ');

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
    
    const content = renderCard(product);

    return (
        <section className='product'>
            <div className="container">
                {content}
                {/* <div className="product__row">
                    <div className="product__image">
                        <img src={img} alt="Calf Sauce" />
                    </div>
                    <div className="product__content">
                        <div className='product__info'>
                            <h1 className='product__content-title'>Calf Sauce</h1>
                            <span>weight</span>
                        </div>
                        <div className="product__controls">
                            <div className="product__controls_price">$3.00</div>
                            <div className="product__controls_buttons">
                                <button>-</button>
                                <span>900</span>
                                <button>+</button>
                            </div>
                        </div>
                        <div className="product__description">
                            <h3>Ingredients:</h3>
                            <p>Лосось, сыр "Филадельфия", огурец, авокадо</p>
                        </div>
                        <button className='product__button'>Add to cart</button>
                    </div>
                </div> */}
            </div>
        </section>
    );
};

export default ProductItem;