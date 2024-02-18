import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { addToCart } from '../../reducers/cartSlice';
import { Spinner } from '../index';

const RestaurantItemCard = ({ cardsArray }) => {
    const dispatch = useDispatch();

    const renderItems = arr => {
        const cards = arr.map(card => {
            const { name, id, price, description, image } = card,
                img = require(`../../resources/${image}`),
                nameWithPath = image
                    .replace(/restaurant\//, ' ')
                    .replace(/_/g, '-'),
                restaurantName = nameWithPath
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
                        to={`/restaurant/${restaurantName}/${id}`}
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
                        <button
                            type="button"
                            onClick={() => dispatch(addToCart(card))}
                        >
                            BUY
                        </button>
                    </div>
                </motion.li>
            );
        });

        return cards;
    };

    const cardsList = renderItems(cardsArray);

    return (
        <ul className="restaurant__cards_row">
            {cardsList.length === 0 ? (
                <div>
                    <h1>Sorry products not found</h1>
                    <Spinner />
                </div>
            ) : (
                cardsList
            )}
        </ul>
    );
};

export default RestaurantItemCard;
