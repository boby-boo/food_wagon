import React, { useEffect, useState } from 'react';
import Slider from "react-slick";
import Spinner from '../spinner/Spinner';

import { Link } from 'react-router-dom';
import { useHttp } from '../../hooks/http.hook';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../actions';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import './popularItems.scss';

const SamplePrevArrow = (props) => {
    const { onClick } = props;
    return (
        <div
            className='popular-items__slider_prev-btn'
            onClick={onClick}
        />
    );
}

const SampleNextArrow = (props) => {
    const { onClick } = props;
    return (
        <div
            className='popular-items__slider_next-btn'
            onClick={onClick}
        />
    );
}

const PopularItems = () => {
    const [cards, setCards] = useState();
    const { request } = useHttp();

    const dispatch = useDispatch();

    useEffect(() => {
        request('http://localhost:3001/restaurant?_start=0&_end=3')
            .then(res => setCards(res));
    }, []);

    const settings = {
        autoplay: true,
        infinite: true,
        autoplaySpeed: 3000,
        speed: 800,
        arrows: true,
        prevArrow: <SamplePrevArrow />,
        nextArrow: <SampleNextArrow />,
        slidesToShow: 5,
        slidesToScroll: 3,
        responsive: [
            {
                breakpoint: 1824,
                settings: {
                slidesToShow: 4,
                slidesToScroll: 2,
                arrows: false
            }
            },
            {
            breakpoint: 1300,
            settings: {
                slidesToShow: 3.60,
                slidesToScroll: 2,
                arrows: false
            }
            },
            {
            breakpoint: 1100,
            settings: {
                slidesToShow: 3.10,
                slidesToScroll: 2,
                arrows: false
            }
            },
            {
            breakpoint: 950,
            settings: {
                slidesToShow: 2.55,
                slidesToScroll: 2,
                arrows: false
            }
            },
            {
            breakpoint: 800,
            settings: {
                slidesToShow: 2.10,
                slidesToScroll: 2,
                arrows: false
            }
            },
            {
            breakpoint: 670,
            settings: {
                slidesToShow: 1.55,
                centerMode: true,
                slidesToScroll: 1,
                arrows: false,
            }
            },
            {
            breakpoint: 590,
            settings: {
                slidesToShow: 1.22,
                centerMode: true,
                slidesToScroll: 1,
                arrows: false,
            }
            },
            {
            breakpoint: 500,
            settings: {
                slidesToShow: 1.1,
                centerMode: true,
                slidesToScroll: 1,
                arrows: false,
            }
            }
        ]
    }
    
    if (!cards) {
        return (
            <Spinner/>
        )
    }
    
    const renderItems = (data) => {
        const cardsRow = data.map(restaurant => {
            const cards = restaurant.data.map(card => {
                const   {name, id, price, image} = card,
                        img = require(`../../resources/${image}`);
                    
                return (
                    <div className='popular-item'>
                        <div className="popular-item__body">
                            <Link 
                                to={`/${restaurant.products}/${id}`}>
                                    <div className="popular-item__image">
                                        <img src={img} alt={name} />
                                    </div>
                            </Link>
                            <div className="popular-item__description">
                                <h3>{name}</h3>
                                <Link
                                    to={`/${restaurant.products}`}
                                    className='popular-item__description_location'>
                                    {restaurant.partnerName}
                                </Link>
                                ${price.toFixed(2)}
                            </div>
                        </div>
                        <button 
                            onClick={() => dispatch(addToCart(card))}
                            className="popular-item__button">
                                Order Now
                        </button>
                    </div>
                )
            })
            return cards;
        })

        return (
            <Slider {...settings}>
                {cardsRow}
            </Slider>
        )
    }

    const cardsRow = renderItems(cards);

    return (
        <section className='popular-items'>
            <div className="container">
                <h2 className='primary-title'>Popular items</h2> 
                {cardsRow}
            </div>
        </section>
    );
};

export default PopularItems;