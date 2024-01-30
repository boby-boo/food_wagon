import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Slider from 'react-slick';
import { motion, AnimatePresence } from 'framer-motion';
import { productItemSliderSettings } from '../utils';
import { dataOfCards, dataOfCart } from '../../reducers/selectors';
import userIcon from '../../resources/images/user__icon.png';
import rateIcon from '../../resources/icons/restaurant__card_rating.svg';
import { addToCart } from '../../reducers/cartSlice';
import Spinner from '../spinner/Spinner';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

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

    const cardsData = useSelector(dataOfCards);
    const { productId } = useParams();

    const handleSlideChange = index => {
        if (cardsData) {
            setUpdateProductId(cardsData[index].id);
        }
    };

    if (!cardsData) {
        return <Spinner />;
    }

    productItemSliderSettings.prevArrow = <SamplePrevArrow />;
    productItemSliderSettings.nextArrow = <SampleNextArrow />;

    const renderCards = arr => {
        const id = updateProductId || productId;

        const cards = arr.map(card => (
            <ProductCard card={card} key={card.id} />
        ));

        const initialIndex = arr.findIndex(item => item.id === id);

        return (
            <>
                <div className="product__slider">
                    <Slider
                        {...productItemSliderSettings}
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

    const content = renderCards(cardsData);
    const review = renderReview(cardsData);

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
    const [productData, setProductData] = useState(null);
    const cartData = useSelector(dataOfCart);
    const dispatch = useDispatch();

    const { name, price, image, weight, ingredients, id } = card;
    const img = require(`../../resources/${image}`);
    const ing = ingredients.join(', ');

    useEffect(() => {
        const checkDuplicate = cartData.find(item => item.id === id);
        const count = checkDuplicate ? checkDuplicate.quantity : 0;

        setProductData({
            ...card,
            quantity: count,
        });
    }, []);

    const handleClick = value => {
        if (productData.quantity <= 0 && value === -1) return;

        const currentQty = productData.quantity + value;
        setProductData({
            ...productData,
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
                                type="button"
                                className="btn__icon_minus"
                                onClick={() => handleClick(-1)}
                            />
                            <span>{productData?.quantity}</span>
                            <button
                                type="button"
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
                        type="button"
                        className="product__button"
                        onClick={() => addProductToCart(productData)}
                    >
                        Add to cart
                    </button>
                </div>
            </div>
        </>
    );
};

export default ProductItem;
