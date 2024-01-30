import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Slider from 'react-slick';
import { motion } from 'framer-motion';
import Spinner from '../spinner/Spinner';
import { popularItemsSliderSettings } from '../utils';
import { addToCart } from '../../reducers/cartSlice';
import useFoodWagonService from '../../services/FoodWagonService';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const SamplePrevArrow = props => {
    const { onClick } = props;
    return <div className="popular-items__slider_prev-btn" onClick={onClick} />;
};

const SampleNextArrow = props => {
    const { onClick } = props;
    return <div className="popular-items__slider_next-btn" onClick={onClick} />;
};

const PopularItems = () => {
    const [cardsData, setCardsData] = useState();
    const { getPopularProducts } = useFoodWagonService();
    const dispatch = useDispatch();

    useEffect(() => {
        getPopularProducts().then(res => {
            setCardsData(res);
        });
    }, []);

    if (!cardsData) {
        return <Spinner />;
    }

    popularItemsSliderSettings.prevArrow = <SamplePrevArrow />;
    popularItemsSliderSettings.nextArrow = <SampleNextArrow />;

    const renderItems = data => {
        const cardsRow = data.map(restaurant => {
            const slide = restaurant.data.map(card => {
                const { name, id, price, image } = card,
                    img = require(`../../resources/${image}`);

                return (
                    <div className="popular-item" key={id}>
                        <div className="popular-item__body">
                            <Link
                                to={`/restaurant/${restaurant.products}/${id}`}
                            >
                                <div className="popular-item__image">
                                    <img src={img} alt={name} />
                                </div>
                            </Link>
                            <div className="popular-item__description">
                                <h3>{name}</h3>
                                <Link
                                    to={`/restaurant/${restaurant.products}`}
                                    className="popular-item__description_location"
                                >
                                    {restaurant.partnerName}
                                </Link>
                                ${price.toFixed(2)}
                            </div>
                        </div>
                        <button
                            type="button"
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

        return <Slider {...popularItemsSliderSettings}>{cardsRow}</Slider>;
    };

    const cardsRow = renderItems(cardsData);

    return (
        <>
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
        </>
    );
};

export default PopularItems;
