import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { foodCategorySliderSettings } from '../utils';
import useFoodWagonService from '../../services/FoodWagonService';
import Spinner from '../spinner/Spinner';

import './foodCategory.scss';

const FoodCategory = () => {
    const [categoriesData, setCategoriesData] = useState();

    const sliderRef = useRef(null);
    const { getCategoryRestaurant } = useFoodWagonService();

    useEffect(() => {
        getCategoryRestaurant().then(res => setCategoriesData(res));
    }, []);

    const handlePrevClick = () => {
        if (sliderRef.current) {
            sliderRef.current.slickPrev();
        }
    };

    const handleNextClick = () => {
        sliderRef.current.slickNext();
    };

    if (!categoriesData) {
        return <Spinner />;
    }

    const renderItems = arr => {
        const content = arr.map(item => {
            const { category, image } = item,
                img = require(`../../resources/${image}`);

            return (
                <Link
                    className="search__food_card food__card"
                    to={`/search/${category}`}
                    key={img}
                >
                    <div className="food__card_image">
                        <img src={img} alt={category} />
                    </div>
                    <h3>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                    </h3>
                </Link>
            );
        });

        return (
            <ul className="search__food_slider">
                <Slider ref={sliderRef} {...foodCategorySliderSettings}>
                    {content}
                    {content}
                </Slider>
            </ul>
        );
    };

    const contentItems = renderItems(categoriesData);

    return (
        <motion.section
            className="search__food"
            initial={{ opacity: 0 }}
            viewport={{ amount: 0.3 }}
            whileInView={{ opacity: 1 }}
        >
            <div className="container">
                <div className="search__food_content">
                    <h2 className="primary-title">Search by Food</h2>
                    <div className="search__food_buttons">
                        <Link
                            to="/search/all"
                            className="search__food_buttons_view"
                        >
                            View All
                        </Link>
                        <div className="search__food_buttons_slider">
                            <button
                                onClick={handlePrevClick}
                                className="search__food_buttons_slider__prev_item"
                            />
                            <button
                                onClick={handleNextClick}
                                className="search__food_buttons_slider__next_item"
                            />
                        </div>
                    </div>
                </div>
                {contentItems}
            </div>
        </motion.section>
    );
};

export default FoodCategory;
