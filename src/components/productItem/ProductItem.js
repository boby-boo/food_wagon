import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Slider from 'react-slick';
import { motion, AnimatePresence } from 'framer-motion';
import userIcon from '../../resources/images/user__icon.png';
import rateIcon from '../../resources/icons/restaurant__card_rating.svg';
import { addToCart } from '../../reducers/cartSlice';
import Spinner from '../spinner/Spinner';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './productItem.scss';

const SamplePrevArrow = props => {
    const { onClick } = props;
    return <div className="product__prev_btn" onClick={onClick} />;
};

const SampleNextArrow = props => {
    const { onClick } = props;
    return <div className="product__next_btn" onClick={onClick} />;
};

const ProductItem = () => {
    const [updateProductId, setUpdateProductId] = useState(null);

    const data = useSelector(state => state.dataCards.dataCards);
    const { productId } = useParams();

    const handleSlideChange = index => {
        if (data) {
            setUpdateProductId(data[index].id);
        }
    };

    if (!data) {
        return <Spinner />;
    }

    const renderCards = arr => {
        const id = updateProductId || productId;
        console.log('__________________________');
        console.log('updateProductId ', updateProductId);
        console.log('productId ', productId);
        console.log('__________________________');
        const cards = arr.map(card => (
            <ProductCard card={card} key={card.id} />
        ));
        const initialIndex = arr.findIndex(item => item.id === id);
        console.log(id);
        console.log(initialIndex);
        console.log(arr);
        console.log(arr[initialIndex].description);
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
                    <AnimatePresence mode="popLayout">
                        <motion.div
                            key={initialIndex}
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 10, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            {arr[initialIndex].description}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </>
        );
    };

    const renderReview = array => {
        const id = updateProductId || productId;
        const card = array.find(item => item.id === id);

        if (card.review.length === 0) {
            return (
                <motion.div
                    className="review"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ amount: 0.1 }}
                >
                    <h2 className="review__title">
                        There are no reviews for this product yet.
                    </h2>
                </motion.div>
            );
        }

        const content = card.review.map(item => {
            const { author, rate, comment, date } = item,
                rateStart = [];

            for (let i = 1; i <= rate; i++) {
                rateStart.push(<img key={i} src={rateIcon} alt="star icon" />);
            }

            return (
                <motion.li
                    key={author + comment + date}
                    className="review-card"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                >
                    <div className="review-card__info">
                        <div className="review-card__author">
                            <div className="review-card__author_image">
                                <img src={userIcon} alt="logo user" />
                            </div>
                            <div className="review-card__author_desc">
                                <h3>{author}</h3>
                                <span>{date}</span>
                                <div className="review-card__author_desc-rate">
                                    {rateStart}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="review-card__message">{comment}</div>
                </motion.li>
            );
        });

        return (
            <div className="review">
                <h2 className="review__title">Review</h2>
                <ul className="review__row">{content}</ul>
            </div>
        );
    };

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
                    className: 'center',
                    centerMode: true,
                    centerPadding: '0px',
                    arrows: false,
                },
            },
        ],
    };

    const content = renderCards(data);
    const review = renderReview(data);

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
    const [product, setProduct] = useState(null);
    const cart = useSelector(state => state.cart.cart);
    const dispatch = useDispatch();

    const { name, price, image, weight, ingredients, id } = card;
    const img = require(`../../resources/${image}`);
    const ing = ingredients.join(', ');

    useEffect(() => {
        const checkDuplicate = cart.find(item => item.id === id);
        const count = checkDuplicate ? checkDuplicate.quantity : 0;

        setProduct({
            ...card,
            quantity: count,
        });
    }, []);

    const handleClick = value => {
        if (product.quantity <= 0 && value === -1) return;

        const currentQty = product.quantity + value;
        setProduct({
            ...product,
            quantity: currentQty,
        });
    };

    const addProductToCart = item => {
        if (item.quantity === 0) return;
        dispatch(addToCart(item));
    };

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
                            <button
                                className="btn__icon_minus"
                                onClick={() => handleClick(-1)}
                            />
                            <span>{product?.quantity}</span>
                            <button
                                className="btn__icon_plus"
                                onClick={() => handleClick(+1)}
                            />
                        </div>
                    </div>
                    <div className="product__description">
                        <h3>Ingredients:</h3>
                        <p>{ing}</p>
                    </div>
                    <button
                        className="product__button"
                        onClick={() => addProductToCart(product)}
                    >
                        Add to cart
                    </button>
                </div>
            </div>
        </>
    );
};

export default ProductItem;
