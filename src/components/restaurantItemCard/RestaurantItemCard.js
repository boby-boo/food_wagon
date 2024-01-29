import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { dataOfCards, dataOfFilteredCards } from '../../reducers/selectors';
import { addToCart } from '../../reducers/cartSlice';

import './restaurantItemCard.scss';

const RestaurantItemCard = () => {
    const location = useLocation();
    const dataCards = useSelector(dataOfCards);
    const filteredProductsData = useSelector(dataOfFilteredCards);
    const dispatch = useDispatch();
    const { restaurantName } = useParams();

    const renderItems = arr => {
        const cards = arr.map(card => {
            const { name, id, price, description, image } = card,
                img = require(`../../resources/${image}`),
                nameWithPath = image
                    .replace(/restaurant\//, ' ')
                    .replace(/_/g, '-'),
                defaultRestaurantName = nameWithPath
                    .substring(0, nameWithPath.search(/\//))
                    .trim();

            return (
                <motion.li
                    key={id}
                    className="card"
                    initial={{ opacity: 0 }}
                    viewport={{ amount: 0.1 }}
                    whileInView={{ opacity: 1 }}
                >
                    <Link
                        className="card__main"
                        to={`/restaurant/${
                            restaurantName || defaultRestaurantName
                        }/${id}`}
                    >
                        <div className="card__image">
                            <img src={img} alt={name}></img>
                        </div>
                        <div className="card__description">
                            <h3>{name}</h3>
                            <p>
                                {description.length > 121
                                    ? `${description.substring(0, 121)} ...`
                                    : description}
                            </p>
                        </div>
                    </Link>
                    <div className="card__footer">
                        <span>${price.toFixed(2)}</span>
                        <button onClick={() => dispatch(addToCart(card))}>
                            BUY
                        </button>
                    </div>
                </motion.li>
            );
        });
        return cards;
    };

    const cardsList = renderItems(
        location.pathname.search(/search/) !== -1
            ? filteredProductsData
            : dataCards,
    );

    return <ul className="restaurant__cards_row">{cardsList}</ul>;
};

export default RestaurantItemCard;
