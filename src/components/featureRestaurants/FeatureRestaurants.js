import React, { useEffect, useState } from 'react';
import { useHttp } from '../../hooks/http.hook';
import { Link } from 'react-router-dom';

import Spinner from '../spinner/Spinner';

import './featureRestaurants.scss';

const FeatureRestaurants = () => {
    const [data, setData] = useState(null);
    const [restaurantQty, setRestaurantQty] = useState(3);

    const { request } = useHttp();

    useEffect(() => {
        request(`http://localhost:3001/partners?_limit=${restaurantQty}`)
            .then(res => setData(res))
            .then(() => setRestaurantQty(restaurantQty + 3))
    }, []);

    const req = (qty=3) => {
        request(`http://localhost:3001/partners?_limit=${qty}`)
            .then(res => setData(res))
            .then(() => setRestaurantQty(restaurantQty + 3))
    }

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
                    <button onClick={() => req(restaurantQty)} className='restaurants__button primary__button'>
                        View All
                    </button>
                </div>
            </div>
        </section>
    );
};

export default FeatureRestaurants;