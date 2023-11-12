import React from 'react';
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import './popularItems.scss';

import popularImage1 from '../../resources/images/popular__items-img1.png'; 
import popularImage2 from '../../resources/images/popular__items-img2.png'; 
import popularImage3 from '../../resources/images/popular__items-img3.png'; 
import popularImage4 from '../../resources/images/popular__items-img4.png'; 
import popularImage5 from '../../resources/images/popular__items-img5.png'; 

const SamplePrevArrow = (props) => {
    const {onClick } = props;
    return (
      <div
        className='popular-items__slider_prev-btn'
        onClick={onClick}
      />
    );
}

const SampleNextArrow = (props) => {
    const {onClick } = props;
    return (
      <div
      className='popular-items__slider_next-btn'
        onClick={onClick}
      />
    );
}

const PopularItems = () => {
    const settings = {
        autoplay: true,
        infinite: true,
        autoplaySpeed: 3000,
        speed: 800,
        arrows: true,
        prevArrow: <SamplePrevArrow />,
        nextArrow: <SampleNextArrow />,
        slidesToShow: 5,
        slidesToScroll: 3,
        responsive: [
            {
                breakpoint: 1824,
                settings: {
                slidesToShow: 4,
                slidesToScroll: 2,
                arrows: false
            }
            },
            {
            breakpoint: 1300,
            settings: {
                slidesToShow: 3.60,
                slidesToScroll: 2,
                arrows: false
            }
            },
            {
            breakpoint: 1100,
            settings: {
                slidesToShow: 3.10,
                slidesToScroll: 2,
                arrows: false
            }
            },
            {
            breakpoint: 950,
            settings: {
                slidesToShow: 2.55,
                slidesToScroll: 2,
                arrows: false
            }
            },
            {
            breakpoint: 800,
            settings: {
                slidesToShow: 2.10,
                slidesToScroll: 2,
                arrows: false
            }
            },
            {
            breakpoint: 670,
            settings: {
                slidesToShow: 1.55,
                centerMode: true,
                slidesToScroll: 1,
                arrows: false,
            }
            },
            {
            breakpoint: 590,
            settings: {
                slidesToShow: 1.22,
                centerMode: true,
                slidesToScroll: 1,
                arrows: false,
            }
            },
            {
            breakpoint: 500,
            settings: {
                slidesToShow: 1.1,
                centerMode: true,
                slidesToScroll: 1,
                arrows: false,
            }
            }
        ]
    }
    
    return (
        <section className='popular-items'>
            <div className="container">
                <h2 className='primary-title'>Popular items</h2> 
                    <Slider {...settings}>
                        <div className="popular-item">
                            <div className="popular-item__image">
                                <img src={popularImage1} alt="popular food" />
                            </div>
                            <div className="popular-item__description">
                                <h3>Cheese Burger </h3>
                                <div className='popular-item__description_location'>Burger Arena</div>
                                $3.88
                            </div>
                                <button className="popular-item__button">Order Now</button>
                        </div>

                        <div className="popular-item">
                            <div className="popular-item__image">
                                <img src={popularImage2} alt="popular food" />
                            </div>
                            <div className="popular-item__description">
                                <h3>Toffe’s Cake</h3>
                                <div className='popular-item__description_location'>Top Sticks</div>
                                $4.00
                            </div>
                                <button className="popular-item__button">Order Now</button>
                        </div>

                        <div className="popular-item">
                            <div className="popular-item__image">
                                <img src={popularImage3} alt="popular food" />
                            </div>
                            <div className="popular-item__description">
                                <h3>Dancake</h3>
                                <div className='popular-item__description_location'>Cake World</div>
                                $1.99
                            </div>
                                <button className="popular-item__button">Order Now</button>
                        </div>

                        <div className="popular-item">
                            <div className="popular-item__image">
                                <img src={popularImage4} alt="popular food" />
                            </div>
                            <div className="popular-item__description">
                                <h3>Crispy Sandwitch</h3>
                                <div className='popular-item__description_location'>Fastfood Dine</div>
                                $3.00
                            </div>
                                <button className="popular-item__button">Order Now</button>
                        </div>

                        <div className="popular-item">
                            <div className="popular-item__image">
                                <img src={popularImage5} alt="popular food" />
                            </div>
                            <div className="popular-item__description">
                                <h3>Thai Soup</h3>
                                <div className='popular-item__description_location'>Foody man</div>
                                $2.79
                            </div>
                                <button className="popular-item__button">Order Now</button>
                        </div>

                        <div className="popular-item">
                            <div className="popular-item__image">
                                <img src={popularImage1} alt="popular food" />
                            </div>
                            <div className="popular-item__description">
                                <h3>Cheese Burger </h3>
                                <div className='popular-item__description_location'>Burger Arena</div>
                                $3.88
                            </div>
                                <button className="popular-item__button">Order Now</button>
                        </div>

                        <div className="popular-item">
                            <div className="popular-item__image">
                                <img src={popularImage2} alt="popular food" />
                            </div>
                            <div className="popular-item__description">
                                <h3>Toffe’s Cake</h3>
                                <div className='popular-item__description_location'>Top Sticks</div>
                                $4.00
                            </div>
                                <button className="popular-item__button">Order Now</button>
                        </div>

                        <div className="popular-item">
                            <div className="popular-item__image">
                                <img src={popularImage3} alt="popular food" />
                            </div>
                            <div className="popular-item__description">
                                <h3>Dancake</h3>
                                <div className='popular-item__description_location'>Cake World</div>
                                $1.99
                            </div>
                                <button className="popular-item__button">Order Now</button>
                        </div>

                        <div className="popular-item">
                            <div className="popular-item__image">
                                <img src={popularImage4} alt="popular food" />
                            </div>
                            <div className="popular-item__description">
                                <h3>Crispy Sandwitch</h3>
                                <div className='popular-item__description_location'>Fastfood Dine</div>
                                $3.00
                            </div>
                                <button className="popular-item__button">Order Now</button>
                        </div>

                        <div className="popular-item">
                            <div className="popular-item__image">
                                <img src={popularImage5} alt="popular food" />
                            </div>
                            <div className="popular-item__description">
                                <h3>Thai Soup</h3>
                                <div className='popular-item__description_location'>Foody man</div>
                                $2.79
                            </div>
                                <button className="popular-item__button">Order Now</button>
                        </div>

                    </Slider>
            </div>
        </section>
    );
};

export default PopularItems;