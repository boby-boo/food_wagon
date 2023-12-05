import React, { useEffect, useState } from "react";
import { useHttp } from "../../hooks/http.hook";

const RestaurantCards = () => {
    const [cards, setCads] = useState(null);

    const { request } = useHttp();

    useEffect(() => {
        request("http://localhost:3001/foodBand").then((res) => setCads(res));
    }, []);

    if (!cards) {
        return <h1>Sorry</h1>;
    }

    const renderItems = (restaurant, data) => {
        const cards = data.map((card) => {
            const   { description, id, image, name, price } = card,
                    img = require(`../../resources/${image}`);
            return (
                <div key={id}>
                    <img src={img} alt={name} />
                    <h2>{name}</h2>
                    <p>{description}</p>
                    <span>{price}$</span>
                </div>
            );
        });

        return (
            <>
                <h1>{restaurant.partnerName}</h1>
                <h2>{restaurant.category}</h2>
                <h3>{restaurant.rate}</h3>
                {cards}
            </>
        );
    };

    const cardsItems = renderItems(cards, cards.data);
    return <div>{cardsItems}</div>;
};

export default RestaurantCards;
