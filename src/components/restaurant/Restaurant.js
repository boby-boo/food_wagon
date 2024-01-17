import React, { useEffect, useState } from 'react';
import { useParams, Link, Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Filter from '../filter/Filter';
import Spinner from '../spinner/Spinner';
import BackButton from '../backButton/BackButton';
import useFoodWagonService from '../../services/FoodWagonService';
import { updateDataCards } from '../../reducers/dataCardsSlice';

import './restaurant.scss';

const Restaurant = () => {
    const [cards, setCards] = useState(null);
    const [initialCards, setInitialCards] = useState(null);

    const { restaurantName } = useParams();
    const { getRestaurant } = useFoodWagonService(),
        dispatch = useDispatch();

    const options = [
        { value: '0', label: 'Featured' },
        { value: '1', label: 'Low to High' },
        { value: '2', label: 'High to Low' },
    ];

    useEffect(() => {
        getRestaurant(restaurantName).then(res => {
            setInitialCards(JSON.parse(JSON.stringify(res)));
            setCards(res);
            dispatch(updateDataCards(res.data));
        });
    }, [restaurantName]);

    if (!cards) {
        return <Spinner />;
    }

    const getAveragePrice = data => {
        const averagePrice = (
            data.reduce((acc, cur) => acc + cur.price, 0) / data.length
        ).toFixed(2);
        return averagePrice;
    };

    const filterLogic = (arr, value) => {
        let updateData;

        switch (value) {
            case '1':
                updateData = filteredMore();
                break;
            case '2':
                updateData = filteredLess();
                break;
            default:
                updateData = [...initialCards.data];
                break;
        }

        setCards({
            ...arr,
            data: updateData,
        });

        dispatch(updateDataCards(updateData));

        function filteredMore() {
            const updateNewData = [...cards.data];
            updateNewData.sort((a, b) => a.price - b.price);
            return updateNewData;
        }

        function filteredLess() {
            const updateNewData = [...cards.data];
            updateNewData.sort((a, b) => b.price - a.price);
            return updateNewData;
        }
    };

    const restaurantLogo = require(`../../resources/${cards.logo}`),
        averagePrice = getAveragePrice(cards.data);

    return (
        <section className="restaurant">
            <div className="container">
                <BackButton />
                <div className="restaurant__row">
                    <Link
                        className="restaurant__card"
                        to={`/restaurant/${restaurantName}`}
                    >
                        <div className="restaurant__card_image">
                            <img src={restaurantLogo} alt={cards.partnerName} />
                        </div>
                        <div className="restaurant__card_description">
                            <h1>{cards.partnerName}</h1>
                            <span>{cards.rate}</span>
                        </div>
                    </Link>
                    <div className="restaurant__card_price">
                        Average price: <span>${averagePrice}</span>
                    </div>
                    <Filter
                        data={cards}
                        filterLogic={filterLogic}
                        options={options}
                        currentSelect="Featured"
                        headerText="Filter by:"
                    />
                </div>
                <Outlet />
            </div>
        </section>
    );
};

export default Restaurant;
