import { useEffect, useState } from 'react';
import { useParams, Link, Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Filter from '../filter/Filter';
import Spinner from '../spinner/Spinner';
import BackButton from '../backButton/BackButton';
import useFoodWagonService from '../../services/FoodWagonService';
import { updateDataCards } from '../../reducers/dataCardsSlice';
import { restaurantFilterOptions } from '../constants';

import './restaurant.scss';

const Restaurant = () => {
    const [cardData, setCardData] = useState(null);
    const [initialCards, setInitialCards] = useState(null);

    const { restaurantName } = useParams();
    const { getRestaurant } = useFoodWagonService();
    const dispatch = useDispatch();

    useEffect(() => {
        getRestaurant(restaurantName).then(res => {
            setInitialCards(JSON.parse(JSON.stringify(res)));
            setCardData(res);
            dispatch(updateDataCards(res.data));
        });
    }, [restaurantName]);

    if (!cardData) {
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

        setCardData({
            ...arr,
            data: updateData,
        });

        dispatch(updateDataCards(updateData));

        function filteredMore() {
            const updateNewData = [...cardData.data];
            updateNewData.sort((a, b) => a.price - b.price);
            return updateNewData;
        }

        function filteredLess() {
            const updateNewData = [...cardData.data];
            updateNewData.sort((a, b) => b.price - a.price);
            return updateNewData;
        }
    };

    const restaurantLogo = require(`../../resources/${cardData.logo}`),
        averagePrice = getAveragePrice(cardData.data);

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
                            <img
                                src={restaurantLogo}
                                alt={cardData.partnerName}
                            />
                        </div>
                        <div className="restaurant__card_description">
                            <h1>{cardData.partnerName}</h1>
                            <span>{cardData.rate}</span>
                        </div>
                    </Link>
                    <div className="restaurant__card_price">
                        Average price: <span>${averagePrice}</span>
                    </div>
                    <Filter
                        data={cardData}
                        filterLogic={filterLogic}
                        options={restaurantFilterOptions}
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
