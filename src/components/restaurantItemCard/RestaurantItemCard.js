import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useLocation } from 'react-router-dom';

import { addToCart } from '../../reducers/cartSlice';

import './restaurantItemCard.scss';

const RestaurantItemCard = () => {
    const   location = useLocation(),
            dataCards = useSelector(state => state.dataCards.dataCards),
            filteredProductsData = useSelector(state => state.filteredData.filteredData),
            dispatch = useDispatch(),
            { restaurantName } = useParams();

    const renderItems = (arr) => {
        const cards = arr.map(card => {
            const { name, id, price, description, image } = card,
                img = require(`../../resources/${image}`),
                nameWithPath = image.replace(/restaurant\//, ' ').replace(/\_/g, '-');
                
            return (
                <li key={id} className="card">
                    <Link
                        className="card__main"
                        to={`/${restaurantName ? restaurantName : 
                                nameWithPath
                                    .substring(0, nameWithPath.search(/\//))
                                    .trim()}/${id}`}>
                        <div className="card__image">
                            <img src={img} alt={name}></img>
                        </div>
                        <div className="card__description">
                            <h3>{name}</h3>
                            <p>
                                {description.length > 121
                                    ? description.substring(0, 121) + "..."
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
                </li>
            );
        })
        return cards
    }

    const cardsList = renderItems(location.pathname.search(/search/) !== -1 ? filteredProductsData : dataCards)

    return (
        <ul className="restaurant__cards_row">
            {cardsList}
        </ul>
    );
};

export default RestaurantItemCard;