import React, { useEffect, useState } from 'react';
import restaurantCard1 from '../../resources/images/restaurant__card_img1.png';
import restaurantLogo1 from '../../resources/images/restaurant__card_logo8.png';
import restaurantCard2 from '../../resources/images/restaurant__card_img2.png';
import restaurantLogo2 from '../../resources/images/restaurant__card_logo2.png';
import restaurantCard3 from '../../resources/images/restaurant__card_img3.png';
import restaurantLogo3 from '../../resources/images/restaurant__card_logo3.png';
import restaurantCard4 from '../../resources/images/restaurant__card_img4.png';
import restaurantLogo4 from '../../resources/images/restaurant__card_logo4.png';
import restaurantCard5 from '../../resources/images/restaurant__card_img5.png';
import restaurantLogo5 from '../../resources/images/restaurant__card_logo5.png';
import restaurantCard6 from '../../resources/images/restaurant__card_img6.png';
import restaurantLogo6 from '../../resources/images/restaurant__card_logo6.png';
import restaurantCard7 from '../../resources/images/restaurant__card_img7.png';
import restaurantLogo7 from '../../resources/images/restaurant__card_logo7.png';
import restaurantCard8 from '../../resources/images/restaurant__card_img8.png';
import restaurantLogo8 from '../../resources/images/restaurant__card_logo8.png';

import './featureRestaurants.scss';
import { useHttp } from '../../hooks/http.hook';

const FeatureRestaurants = () => {
    const [data, setData] = useState(null);
    const [testData, setTestData] = useState(null);

    const { request } = useHttp();

    useEffect(() => {
        request('http://localhost:3001/partners')
            .then(res => setData(res))
    }, []);
    // console.log(testData);

    const checkOpenRestaurant = (workingHours) => {
        const   hoursNow = new Date(),
                workHoursArray = workingHours.replace(/\:/g, ' ').split(' '),
                startWorkHours = new Date(),
                endWorkHours = new Date()

        startWorkHours.setHours(workHoursArray[0], workHoursArray[1], 0, 0)
        endWorkHours.setHours(workHoursArray[3], workHoursArray[4], 0, 0)

        const isOpen = hoursNow >= startWorkHours && hoursNow <= endWorkHours;

        const text = isOpen ? 'Open now' : 'Open tomorrow';
        const isWork = isOpen ? '_open' : '';

        return [text, isWork];
    }

    if (!data) {
        return (
            <h1>Sorry</h1>
        )
    }

    const rerenderItems = (data) => {
        const items = data.map(item => {
            const   {name, logo, rate, image, working_hours} = item,
                    img = require(`../../resources/${image}`),
                    logotype = require(`../../resources/${logo}`);

            const [text, isWork] = checkOpenRestaurant(working_hours);

            return (
                <li key={name} className="primary__card restaurant__card">
                <a href="/">
                    <div className="primary__card_content restaurant__card_content">
                        <div className="primary__card_image">
                            <img src={img} alt={name} />
                        </div>
                        <div className="restaurant__card_items">
                            <div className="restaurant__card_discount">20% off</div>
                            <div className="restaurant__card_speed">Fast</div>
                        </div>
                    </div>
                    <div className="restaurant__card_review card__review">
                        <div className="card__review_logo">
                            <img src={logotype} alt={name} />
                        </div>
                        <div className="card__review_about">
                            <h3>{name}</h3>
                            <span>{rate}</span>
                        </div>
                    </div>
                    <div className={`primary__card_footnote main__footnote${isWork} restaurant__card_footnote`}>
                        {text}
                    </div>
                </a>
            </li>
            )
        })

        return items;
    }

    const content = rerenderItems(data);
    
    return (
        <section className='feature-restaurants restaurants'>
            <div className="container">
                <h2 className='primary-title'>Featured Restaurants</h2>
                <ul className="restaurants__row">
                    {content}
                    <li className="primary__card restaurant__card">
                        <a href="/">
                            <div className="primary__card_content restaurant__card_content">
                                <div className="primary__card_image">
                                    <img src={restaurantCard1} alt="" />
                                </div>
                                <div className="restaurant__card_items">
                                    <div className="restaurant__card_discount">20% off</div>
                                    <div className="restaurant__card_speed">Fast</div>
                                </div>
                            </div>
                            <div className="restaurant__card_review card__review">
                                <div className="card__review_logo">
                                    <img src={restaurantLogo1} alt="" />
                                </div>
                                <div className="card__review_about">
                                    <h3>Foodworld</h3>
                                    <span>46</span>
                                </div>
                            </div>
                            <div className="primary__card_footnote main__footnote restaurant__card_footnote">
                                Opens tomorrow
                            </div>
                        </a>
                    </li>

                    <li className="primary__card restaurant__card">
                        <a href="/">
                            <div className="primary__card_content restaurant__card_content">
                                <div className="primary__card_image">
                                    <img src={restaurantCard2} alt="" />
                                </div>
                                <div className="restaurant__card_items">
                                    <div className="restaurant__card_discount">15% off</div>
                                    <div className="restaurant__card_speed">Fast</div>
                                </div>
                            </div>
                            <div className="restaurant__card_review card__review">
                                <div className="card__review_logo">
                                    <img src={restaurantLogo2} alt="" />
                                </div>
                                <div className="card__review_about">
                                    <h3>Pizzahub</h3>
                                    <span>40</span>
                                </div>
                            </div>
                            <div className="primary__card_footnote main__footnote restaurant__card_footnote">
                                Opens tomorrow
                            </div>
                        </a>
                    </li>

                    <li className="primary__card restaurant__card">
                        <a href="/">
                            <div className="primary__card_content restaurant__card_content">
                                <div className="primary__card_image">
                                    <img src={restaurantCard3} alt="" />
                                </div>
                                <div className="restaurant__card_items">
                                    <div className="restaurant__card_discount">10% off</div>
                                    <div className="restaurant__card_speed">Fast</div>
                                </div>
                            </div>
                            <div className="restaurant__card_review card__review">
                                <div className="card__review_logo">
                                    <img src={restaurantLogo3} alt="" />
                                </div>
                                <div className="card__review_about">
                                    <h3>Donuts hut</h3>
                                    <span>20</span>
                                </div>
                            </div>
                            <div className="main__footnote_open restaurant__card_footnote">
                                Open Now
                            </div>
                        </a>
                    </li>

                    <li className="primary__card restaurant__card">
                        <a href="/">
                            <div className="primary__card_content restaurant__card_content">
                                <div className="primary__card_image">
                                    <img src={restaurantCard4} alt="" />
                                </div>
                                <div className="restaurant__card_items">
                                    <div className="restaurant__card_discount">15% off</div>
                                    <div className="restaurant__card_speed">Fast</div>
                                </div>
                            </div>
                            <div className="restaurant__card_review card__review">
                                <div className="card__review_logo">
                                    <img src={restaurantLogo4} alt="" />
                                </div>
                                <div className="card__review_about">
                                    <h3>Donuts hut</h3>
                                    <span>50</span>
                                </div>
                            </div>
                            <div className="main__footnote_open restaurant__card_footnote">
                                Open Now
                            </div>
                        </a>
                    </li>

                    <li className="primary__card restaurant__card">
                        <a href="/">
                            <div className="primary__card_content restaurant__card_content">
                                <div className="primary__card_image">
                                    <img src={restaurantCard5} alt="" />
                                </div>
                                <div className="restaurant__card_items">
                                    <div className="restaurant__card_discount">10% off</div>
                                    <div className="restaurant__card_speed">Fast</div>
                                </div>
                            </div>
                            <div className="restaurant__card_review card__review">
                                <div className="card__review_logo">
                                    <img src={restaurantLogo5} alt="" />
                                </div>
                                <div className="card__review_about">
                                    <h3>Ruby Tuesday</h3>
                                    <span>26</span>
                                </div>
                            </div>
                            <div className="main__footnote_open restaurant__card_footnote">
                                Open Now
                            </div>
                        </a>
                    </li>

                    <li className="primary__card restaurant__card">
                        <a href="/">
                            <div className="primary__card_content restaurant__card_content">
                                <div className="primary__card_image">
                                    <img src={restaurantCard6} alt="" />
                                </div>
                                <div className="restaurant__card_items">
                                    <div className="restaurant__card_discount">25% off</div>
                                    <div className="restaurant__card_speed">Fast</div>
                                </div>
                            </div>
                            <div className="restaurant__card_review card__review">
                                <div className="card__review_logo">
                                    <img src={restaurantLogo6} alt="" />
                                </div>
                                <div className="card__review_about">
                                    <h3>Kuakata Fried Chicken</h3>
                                    <span>53</span>
                                </div>
                            </div>
                            <div className="main__footnote_open restaurant__card_footnote">
                                Open Now
                            </div>
                        </a>
                    </li>

                    <li className="primary__card restaurant__card">
                        <a href="/">
                            <div className="primary__card_content restaurant__card_content">
                                <div className="primary__card_image">
                                    <img src={restaurantCard7} alt="" />
                                </div>
                                <div className="restaurant__card_items">
                                    <div className="restaurant__card_discount">10% off</div>
                                    <div className="restaurant__card_speed">Fast</div>
                                </div>
                            </div>
                            <div className="restaurant__card_review card__review">
                                <div className="card__review_logo">
                                    <img src={restaurantLogo7} alt="" />
                                </div>
                                <div className="card__review_about">
                                    <h3>Red Square</h3>
                                    <span>53</span>
                                </div>
                            </div>
                            <div className="main__footnote_open restaurant__card_footnote">
                                Open Now
                            </div>
                        </a>
                    </li>

                    <li className="primary__card restaurant__card">
                        <a href="/">
                            <div className="primary__card_content restaurant__card_content">
                                <div className="primary__card_image">
                                    <img src={restaurantCard8} alt="" />
                                </div>
                                <div className="restaurant__card_items">
                                    <div className="restaurant__card_discount">10% off</div>
                                    <div className="restaurant__card_speed">Fast</div>
                                </div>
                            </div>
                            <div className="restaurant__card_review card__review">
                                <div className="card__review_logo">
                                    <img src={restaurantLogo8} alt="" />
                                </div>
                                <div className="card__review_about">
                                    <h3>Taco Bell</h3>
                                    <span>35</span>
                                </div>
                            </div>
                            <div className="main__footnote_open restaurant__card_footnote">
                                Open Now
                            </div>
                        </a>
                    </li>
                </ul>
                <div>
                    <button className='restaurants__button primary__button'>
                        View All
                    </button>
                </div>
            </div>
        </section>
    );
};

export default FeatureRestaurants;

// "foodBand": {
//     "partnerName": "Food world",
//     "category": "All",
//     "data": []
//     }