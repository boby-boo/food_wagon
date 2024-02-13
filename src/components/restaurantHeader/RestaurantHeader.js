import { Link } from 'react-router-dom';
import Filter from '../filter/Filter';

const RestaurantHeader = props => {
    const {
        restaurantName,
        cardData,
        filterLogic,
        restaurantFilterOptions,
        isFilterVisible = true,
    } = props;

    const getAveragePrice = data => {
        const averagePrice = (
            data.reduce((acc, cur) => acc + cur.price, 0) / data.length
        ).toFixed(2);
        return averagePrice;
    };

    const restaurantLogo = require(`../../resources/${cardData.logo}`);
    const averagePrice = getAveragePrice(cardData.data);

    return (
        <div className="restaurant__row">
            <Link
                className="restaurant__card"
                to={`/restaurant/${restaurantName}`}
            >
                <div className="restaurant__card_image">
                    <img src={restaurantLogo} alt={cardData.partnerName} />
                </div>
                <div className="restaurant__card_description">
                    <h1>{cardData.partnerName}</h1>
                    <span>{cardData.rate}</span>
                </div>
            </Link>
            <div className="restaurant__card_price">
                Average price: <span>${averagePrice}</span>
            </div>
            {isFilterVisible ? (
                <Filter
                    data={cardData}
                    filterLogic={filterLogic}
                    options={restaurantFilterOptions}
                    currentSelect="Featured"
                    headerText="Filter by:"
                />
            ) : (
                <div className="restaurant__card_price">
                    Average time of delivery:{' '}
                    <span>{cardData.time_of_delivery} min</span>
                </div>
            )}
        </div>
    );
};

export default RestaurantHeader;
