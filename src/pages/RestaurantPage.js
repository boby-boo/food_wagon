import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Spinner from '../components/spinner/Spinner';
import useFoodWagonService from '../services/FoodWagonService';
import { updateDataCards } from '../reducers/dataCardsSlice';
import BackButton from '../components/backButton/BackButton';
import RestaurantHeader from '../components/restaurantHeader/RestaurantHeader';
import RestaurantItemCard from '../components/restaurantItemCard/RestaurantItemCard';
import { restaurantFilterOptions } from '../components/constants';

const RestaurantPage = () => {
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

    return (
        <section className="restaurant">
            <div className="container">
                <BackButton />
                <RestaurantHeader
                    restaurantName={restaurantName}
                    cardData={cardData}
                    filterLogic={filterLogic}
                    restaurantFilterOptions={restaurantFilterOptions}
                />
                <RestaurantItemCard cardsArray={cardData.data} />
            </div>
        </section>
    );
};

export default RestaurantPage;
