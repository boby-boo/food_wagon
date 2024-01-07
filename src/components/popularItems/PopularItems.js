import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Slider from 'react-slick';
import { motion } from 'framer-motion';
import Spinner from '../spinner/Spinner';
import { addToCart } from '../../reducers/cartSlice';
import useFoodWagonService from '../../services/FoodWagonService';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './popularItems.scss';

const SamplePrevArrow = props => {
    const { onClick } = props;
    return <div className="popular-items__slider_prev-btn" onClick={onClick} />;
};

const SampleNextArrow = props => {
    const { onClick } = props;
    return <div className="popular-items__slider_next-btn" onClick={onClick} />;
};

const PopularItems = () => {
    const [cards, setCards] = useState();

    const { getPopularProducts } = useFoodWagonService();
    const dispatch = useDispatch();

    useEffect(() => {
        getPopularProducts().then(res => {
            setCards(res);
        });
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
                    arrows: false,
                },
            },
            {
                breakpoint: 1300,
                settings: {
                    slidesToShow: 3.6,
                    slidesToScroll: 2,
                    arrows: false,
                },
            },
            {
                breakpoint: 1100,
                settings: {
                    slidesToShow: 3.1,
                    slidesToScroll: 2,
                    arrows: false,
                },
            },
            {
                breakpoint: 950,
                settings: {
                    slidesToShow: 2.55,
                    slidesToScroll: 2,
                    arrows: false,
                },
            },
            {
                breakpoint: 800,
                settings: {
                    slidesToShow: 1.22,
                    slidesToScroll: 1,
                    centerMode: true,
                    centerPadding: '120px',
                    arrows: false,
                },
            },
            {
                breakpoint: 670,
                settings: {
                    slidesToShow: 1,
                    centerMode: true,
                    centerPadding: '150px',
                    slidesToScroll: 1,
                    arrows: false,
                },
            },
            {
                breakpoint: 620,
                settings: {
                    slidesToShow: 1.12,
                    centerMode: true,
                    slidesToScroll: 1,
                    arrows: false,
                },
            },
            {
                breakpoint: 500,
                settings: {
                    slidesToShow: 1.1,
                    centerMode: true,
                    centerPadding: '20px',
                    slidesToScroll: 1,
                    arrows: false,
                },
            },
            {
                breakpoint: 400,
                settings: {
                    slidesToShow: 1,
                    centerMode: true,
                    centerPadding: '10px',
                    slidesToScroll: 1,
                    arrows: false,
                },
            },
        ],
    };

    if (!cards) {
        return <Spinner />;
    }

    const renderItems = data => {
        const cardsRow = data.map(restaurant => {
            const slide = restaurant.data.map(card => {
                const { name, id, price, image } = card,
                    img = require(`../../resources/${image}`);

                return (
                    <div className="popular-item" key={id}>
                        <div className="popular-item__body">
                            <Link
                                to={`restaurant/${restaurant.products}/${id}`}
                            >
                                <div className="popular-item__image">
                                    <img src={img} alt={name} />
                                </div>
                            </Link>
                            <div className="popular-item__description">
                                <h3>{name}</h3>
                                <Link
                                    to={`restaurant/${restaurant.products}`}
                                    className="popular-item__description_location"
                                >
                                    {restaurant.partnerName}
                                </Link>
                                ${price.toFixed(2)}
                            </div>
                        </div>
                        <button
                            onClick={() => dispatch(addToCart(card))}
                            className="popular-item__button"
                        >
                            Order Now
                        </button>
                    </div>
                );
            });

            return slide;
        });

        return <Slider {...settings}>{cardsRow}</Slider>;
    };

    const cardsRow = renderItems(cards);

    return (
        <motion.section
            className="popular-items"
            initial={{ opacity: 0 }}
            viewport={{ amount: 0.2 }}
            whileInView={{ opacity: 1 }}
        >
            <div className="container">
                <h2 className="primary-title">Popular items</h2>
                {cardsRow}
            </div>
        </motion.section>
    );
};

export default PopularItems;
