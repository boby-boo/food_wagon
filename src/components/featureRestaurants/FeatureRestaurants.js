import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { Link } from 'react-router-dom';
import useFoodWagonService from '../../services/FoodWagonService';

import Spinner from '../spinner/Spinner';

import './featureRestaurants.scss';

const FeatureRestaurants = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [restaurantOffset, setRestaurantOffset] = useState(4);
    const { getAllRestaurant } = useFoodWagonService();

    useEffect(() => {
        getRestaurants()
    }, []);

    const getRestaurants = (offset) => {
        setLoading(true)
        getAllRestaurant(offset)
            .then(res => setData(res))
            .then(setRestaurantOffset(restaurantOffset + 4))
            .then(() => setLoading(false));
    };

    const checkOpenRestaurant = (workingHours) => {
        const   hoursNow = new Date(),
                workHoursArray = workingHours.replace(/\:/g, ' ').split(' '),
                startWorkHours = new Date(),
                endWorkHours = new Date()

        startWorkHours.setHours(workHoursArray[0], workHoursArray[1], 0, 0)
        endWorkHours.setHours(workHoursArray[3], workHoursArray[4], 0, 0)

        const isOpen = hoursNow >= startWorkHours && hoursNow <= endWorkHours;

        const text = isOpen ? 'Open now' : 'Open tomorrow';
        const isWork = isOpen ? '_open' : '';

        return [text, isWork];
    }

    if (!data) {
        return (
            <Spinner/>
        )
    }

    const rerenderItems = (data) => {
        const items = data.map(item => {
            const   {name, logo, rate, image, working_hours, products} = item,
                    img = require(`../../resources/${image}`),
                    logotype = require(`../../resources/${logo}`);

            const [text, isWork] = checkOpenRestaurant(working_hours);

            return (
                <li key={name} className="primary__card restaurant__card">
                    <Link 
                        to={`/${products}`}
                        state={{page: 'home'}}
                    >
                        <div className="primary__card_content restaurant__card_content">
                            <div className="primary__card_image">
                                <img src={img} alt={name} />
                            </div>
                            <div className="restaurant__card_items">
                                <div className="restaurant__card_discount">20% off</div>
                                <div className="restaurant__card_speed">Fast</div>
                            </div>
                        </div>
                        <div className="restaurant__card_review card__review">
                            <div className="card__review_logo">
                                <img src={logotype} alt={name} />
                            </div>
                            <div className="card__review_about">
                                <h3>{name}</h3>
                                <span>{rate}</span>
                            </div>
                        </div>
                        <div className={`primary__card_footnote main__footnote${isWork} restaurant__card_footnote`}>
                            {text}
                        </div>
                    </Link>
                </li>
            )
        })

        return (
            <ul className="restaurants__row">
                {items}
            </ul>

        );
    }

    const restaurantRow = rerenderItems(data);
    
    return (
        <section className='feature-restaurants restaurants'>
            <div className="container">
                <h2 className='primary-title'>Featured Restaurants</h2>
                    {restaurantRow}
                <div>
                    {restaurantOffset < 9 ?
                        <button onClick={() => getRestaurants(restaurantOffset)} 
                                disabled={loading} 
                                className='restaurants__button primary__button'>
                            View All
                        </button>
                        :
                        null
                    }
                </div>
            </div>
        </section>
    );
};

export default FeatureRestaurants;