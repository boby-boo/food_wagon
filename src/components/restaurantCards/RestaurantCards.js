import React, { useEffect, useState } from "react";
import Spinner from "../spinner/Spinner";
import ProductItem from "../productItem/ProductItem";

import { useHttp } from "../../hooks/http.hook";
import { Link, Route, Routes, useNavigate, useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";

import "./restaurantCards.scss";

const RestaurantCards = () => {
    const [cards, setCads] = useState(null);
    const [initialCards, setInitialCards] = useState(null);

    const { restaurantName } = useParams();

    const navigate = useNavigate();
    const location = useLocation();
    const { request } = useHttp();

    useEffect(() => {
        getRequest();
    }, [restaurantName]);

    const getRequest = () => {
        setCads(() => null);
        request(`http://localhost:3001/restaurant`)
            .then((res) => res.find((item) => item.products === restaurantName))
            .then((res) => {
                setInitialCards(JSON.parse(JSON.stringify(res)));
                setCads(res);
            });
    };

    if (!cards) {
        return (
            <Spinner />
        );
    }

    const renderItems = (arr) => {
        const content = arr.map((card) => {
            const { name, id, price, description, image } = card,
                img = require(`../../resources/${image}`);
            return (
                <li key={id} className="card">
                    <Link
                        className="card__main"
                        to={`/${restaurantName}/${id}`}
                    >
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
                        <button>BUY</button>
                    </div>
                </li>
            );
        });

        return (
            <ul className="restaurant__cards_row">
                {content}
            </ul>
        );
    };

    const getAveragePrice = (data) => {
        const averagePrice = (
            data.reduce((acc, cur) => acc + cur.price, 0) / data.length).toFixed(2);
        return averagePrice;
    };

    const filteredData = (cards, value) => {
        let updateData;

        switch (value) {
            case "1":
                updateData = filteredMore();
                break;
            case "2":
                updateData = filteredLess();
                break;
            default:
                updateData = [...initialCards.data];
                break;
        }

        setCads({
            ...cards,
            data: updateData,
        });

        function filteredMore() {
            const updateData = cards.data.sort((a, b) => {
                if (a.price < b.price) {
                    return 1;
                } else if (a.price > b.price) {
                    return -1;
                } else {
                    return 0;
                }
            });

            return updateData;
        }

        function filteredLess() {
            const updateData = cards.data.sort((a, b) => {
                if (a.price > b.price) {
                    return 1;
                } else if (a.price < b.price) {
                    return -1;
                } else {
                    return 0;
                }
            });

            return updateData;
        }
    };

    const backToHistory = () => {
        if (location.pathname.search(/\d/g) !== -1) {
            navigate(`/${restaurantName}`);
            return;
        }
        if (location.pathname.includes(`${restaurantName}`)) {
            console.log('-1')
            navigate('..');
            return;
        }
    }

    const restaurantLogo = require(`../../resources/${cards.logo}`),
        cardsList = renderItems(cards.data),
        averagePrice = getAveragePrice(cards.data);

    return (
        <section className="restaurant">
            <div className="container">
                <button onClick={() => backToHistory()} className="back-btn">
                    <div className="back-btn__back"></div>
                    <span>Back to {location.pathname.search(/\d/g) !== -1  ? `${cards.partnerName}` : 'Home Page'}</span>
                </button>
                <div className="restaurant__row">
                    <Link
                        className="restaurant__card"
                        to={`/${restaurantName}`}
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
                    <Filter data={cards} filteredData={filteredData} />
                </div>
                <Routes>
                    <Route index element={cardsList} />
                    <Route exact path=":productId" element={<ProductItem />} />
                </Routes>
            </div>
        </section>
    );
};

const Filter = (props) => {
    const [selectedValue, setSelectedValue] = useState("Featured");
    const [isVisible, setIsVisible] = useState(false);

    const { data, filteredData } = props;

    const clickHandler = (e) => {
        setSelectedValue(e.target.textContent);
    };

    const options = [
        { value: "0", label: "Featured" },
        { value: "1", label: "High to Low" },
        { value: "2", label: "Low to High" },
        // { value: '3', label: 'value3' },
        // { value: '4', label: 'value4' },
        // { value: '5', label: 'value5' },
    ];

    const renderItems = (arr) => {
        const items = arr.map((item, index) => {
            const { value, label } = item;

            return (
                <li
                    onClick={(e) => {
                        clickHandler(e);
                        setIsVisible(false);
                        filteredData(data, value);
                    }}
                    key={index}
                    value={value}
                >
                    {label}
                </li>
            );
        });

        return <ul className="filter__body">{items}</ul>;
    };

    const content = renderItems(options);

    return (
        <>
            <div className="filter">
                <div className="filter__header">
                    Filter by:
                    <div
                        className="filter__header_value"
                        onClick={() => setIsVisible(!isVisible)}
                    >
                        {selectedValue}
                        <span className="filter__icon"></span>
                    </div>
                </div>
                {isVisible && content}
            </div>
            {isVisible && (
                <div
                    className="overflow"
                    onClick={() => setIsVisible(false)}
                ></div>
            )}
        </>
    );
};

export default RestaurantCards;