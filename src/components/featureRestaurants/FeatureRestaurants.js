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

const FeatureRestaurants = () => {
    const [data, setData] = useState(null);


    useEffect(() => {
        getData()
    }, []);

  
    const getData = async () => {

        try {
            const response = await fetch('/foodWagonData.json');
            const data = await response.json();

            setData(data.partners);
        } 
        catch(e) {
            throw e;
        }
    
    }
    
    const renderItems = (data) => {
        const items = data.map(item => {
            const {name, time_of_delivery, stars} = item;
            return (
                <li key={name} className="primary__card restaurant__card">
                <a href="/">
                    <div className="primary__card_content restaurant__card_content">
                        <div className="primary__card_image">
                            <img src={restaurantCard1} alt="" />
                        </div>
                        <div className="restaurant__card_items">
                            <div className="restaurant__card_discount">20% off</div>
                            <div className="restaurant__card_speed">{time_of_delivery}</div>
                        </div>
                    </div>
                    <div className="restaurant__card_review card__review">
                        <div className="card__review_logo">
                            <img src={restaurantLogo1} alt="" />
                        </div>
                        <div className="card__review_about">
                            <h3>{name}</h3>
                            <span>{stars}</span>
                        </div>
                    </div>
                    <div className="primary__card_footnote main__footnote restaurant__card_footnote">
                        Opens tomorrow
                    </div>
                </a>
                </li>
            )
        })

        return (
            <ul className="restaurants__row">
                {items}
            </ul>
        )
    }

    if (!data) {
        return (
            <h2>
                Sorry
            </h2>
        ) 
    }

    const content = renderItems(data);

    return (
        <section className='feature-restaurants restaurants'>
            <div className="container">
                <h2 className='primary-title'>Featured Restaurants</h2>
                <ul className="restaurants__row">
                    {content}
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