import React, { useEffect, useState } from "react";
import Spinner from "../spinner/Spinner";
import { useHttp } from "../../hooks/http.hook";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

import './restaurantCards.scss';

const RestaurantCards = () => {
    const [cards, setCads] = useState(null);
    const { restaurantName } = useParams();
    const { request } = useHttp();

    useEffect(() => {
        request(`http://localhost:3001/restaurant`)
            .then(res => res.find(item => item.products === restaurantName))
            .then(res => setCads(res));
    }, []);

    if (!cards) {
        return (
            <div className="empty">
                <Spinner/>
            </div>
        );
    }

    const renderItems = (arr) => {
        const content = arr.map(card => {
            const { name, id, price, description, image } = card,
                    img = require(`../../resources/${image}`);

            return (
                <li key={id} className="card">
                    <div className="card__main">
                        <div className="card__image">
                            <img src={img} alt={name}></img>
                        </div>
                        <div className="card__description">
                            <h3>{name}</h3>
                            <p>{description}</p>
                        </div>
                    </div>
                    <div className="card__footer">
                        <span>${price.toFixed(2)}</span>
                        <button>BUY</button>
                    </div>
                </li>
            )
        })

        return (
            <ul className="restaurant__cards_row">
                {content}
            </ul>
        )
    }

    const getAveragePrice = (data) => {
        const averagePrice = ((data.reduce((acc, cur) => acc + cur.price, 0)) / data.length).toFixed(2);
        return averagePrice;
    }

    const   restaurantLogo = require(`../../resources/${cards.logo}`),
            cardsList = renderItems(cards.data),
            averagePrice = getAveragePrice(cards.data);

    return (
        <section className="restaurant">
            <div className="container">
                <Link to='/' className="back"/>
                <div className="restaurant__row">
                    <div className="restaurant__card">
                        <div className="restaurant__card_image">
                            <img src={restaurantLogo} alt={cards.partnerName} />
                        </div>
                        <div className="restaurant__card_description">
                            <h1>{cards.partnerName}</h1>
                            <span>{cards.rate}</span>
                        </div>
                    </div>
                    <div className="restaurant__card_price">
                        Average price: <span>${averagePrice}</span>
                    </div>
                </div>
                {cardsList}
            </div>
        </section>
    );
};

export default RestaurantCards;
