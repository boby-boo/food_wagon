import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import Spinner from "../spinner/Spinner";
import { useHttp } from "../../hooks/http.hook";
import { useParams } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart } from '../../actions';

import userIcon from '../../resources/images/user__icon.png';
import rateIcon from '../../resources/icons/restaurant__card_rating.svg';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./productItem.scss";

const SamplePrevArrow = (props) => {
    const { onClick } = props;
    return <div className="product__prev_btn" onClick={onClick} />;
};

const SampleNextArrow = (props) => {
    const { onClick } = props;
    return <div className="product__next_btn" onClick={onClick} />;
};

const ProductItem = () => {
    const [data, setData] = useState(null);
    const [updateProductId, setUpdateProductId] = useState(null)

    const { restaurantName, productId } = useParams();

    const { request } = useHttp();

    useEffect(() => {
        request(`http://localhost:3001/restaurant?products=${restaurantName}`)
            .then(res => setData(res[0]))
    }, []);

    const handleSlideChange = (index) => {
        if (data) {
            setUpdateProductId(data.data[index].id)
        }
    };

    if (!data) {
        return <Spinner />;
    }

    const renderCards = (array) => {
        const { data } = array;
        
        const id = updateProductId || productId;
        
        const cards = data.map(card => <ProductCard card={card} key={card.id} />);
        const initialIndex = data.findIndex(item => item.id === id);

        return (
            <>
                <div className="product__slider">
                    <Slider 
                        {...settings}
                        afterChange={handleSlideChange}
                        initialSlide={initialIndex}
                    >
                        {cards}
                    </Slider>
                </div>
                <div className="product__about">
                    <h2>Description: </h2>
                    {data[initialIndex].description}
                </div>
            </>
        )
    }

    const renderReview = (array) => {
        const id = updateProductId || productId;
        const card = array.find(item => item.id === id);

        if (card.review.length === 0) {
            return (
                <section className="review">
                    <h2 className="review__title">There are no reviews for this product yet.</h2>
                </section>
            )
        }

        const content = card.review.map(item => {
            const { author, rate, comment, date } = item,
                    rateStart = [];

            for (let i = 1; i <= rate; i++) {
                rateStart.push(<img key={i} src={rateIcon} alt='star icon'/>)
            }

            return (
                <li className="review-card" key={comment}>
                    <div className="review-card__info">
                        <div className="review-card__author">
                            <div className="review-card__author_image">
                                <img src={userIcon} alt="logo user" />
                            </div>
                            <div className="review-card__author_desc">
                                <h3>{author}</h3>
                                <span>{date}</span>
                                <div className="review-card__author_desc-rate">{rateStart}</div>
                            </div>
                        </div>
                    </div>
                    {comment && 
                    <div className="review-card__message">
                        {comment}
                    </div>
                    }
                </li>
            )
        });

        return (
            <section className="review">
            <h2 className="review__title">Review</h2>
            <ul className="review__row">
                {content}
            </ul>
        </section>
        )
    }

    const settings = {
        autoplay: false,
        infinite: true,
        arrows: true,
        speed: 1000,
        prevArrow: <SamplePrevArrow />,
        nextArrow: <SampleNextArrow />,
        slidesToShow: 1,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1218,
                settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                className: "center",
                centerMode: true,
                centerPadding: "0px",
                arrows: false
                }
            },
            // {
            //     breakpoint: 1036,
            // }
        ]
    }

    const content = renderCards(data);
    const review = renderReview(data.data);
    
    return (
        <section className="product">
            <div className="container">
                {content}
                {review}
            </div>
        </section>
    );
};

const ProductCard = ({ card }) => {
    const [counter, setCounter] = useState(0);
    const cart = useSelector(state => state.cart);
    const dispatch = useDispatch();

    const { name, price, image, weight, ingredients, id } = card,
            img = require(`../../resources/${image}`),
            ing = ingredients.join(", "),
            checkDublicate = cart.find(item => item.id === id),
            count = checkDublicate ? checkDublicate.quantity : counter;

    return (    
        <>
            <div className="product__row">
                <div className="product__image">
                    <img src={img} alt={name} />
                </div>
                <div className="product__content">
                    <div className="product__info">
                        <h1 className="product__content-title">
                            {name} <span>({weight}g)</span>
                        </h1>
                    </div>
                    <div className="product__controls">
                        <div className="product__controls_price">
                            ${price.toFixed(2)}
                        </div>
                        <div className="product__controls_buttons">
                            <button onClick={() => dispatch(removeFromCart(card))}>-</button>
                            <span>{count}</span>
                            <button onClick={() => dispatch(addToCart(card))}>+</button>
                        </div>
                    </div>
                    <div className="product__description">
                        <h3>Ingredients:</h3>
                        <p>{ing}</p>
                    </div>
                    <button 
                        className="product__button"
                        onClick={() => dispatch(addToCart(card))}
                        >
                        Add to cart
                    </button>
                </div>
            </div>
        </>
    );
}

export default ProductItem;