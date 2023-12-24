import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import { addToCart } from '../../actions/index';

import './restaurantItemCard.scss';

const RestaurantItemCard = ({ data }) => {
    const dispatch = useDispatch();
    const { restaurantName } = useParams();

    return (
        <ul className="restaurant__cards_row">
            {
                data.map((card) => {
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
            }
        </ul>
    );
};

export default RestaurantItemCard;