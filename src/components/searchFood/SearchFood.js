import { useRef } from 'react';
import Slider from 'react-slick';
import './searchFood.scss';

import cardImg1 from '../../resources/images/search__food_img1.png';

const SearchFood = () => {
    const sliderRef = useRef(null);

    const handlePrevClick = () => {
        if (sliderRef.current) {
            sliderRef.current.slickPrev();
        }
    }

    const handleNextClick = () => {
        sliderRef.current.slickNext();
    }

    const settings = {
        autoplay: true,
        infinite: true,
        autoplaySpeed: 3000,
        speed: 900,
        arrows: false,
        slidesToShow: 6,
        slidesToScroll: 2,
        responsive: [
            {
                breakpoint: 1824,
                settings: {
                slidesToShow: 5,
                slidesToScroll: 2,
                arrows: false
            }
            },
            {
            breakpoint: 1300,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 2
            }
            },
            {
            breakpoint: 1100,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 2
            }
            },
            {
            breakpoint: 950,
            settings: {
                slidesToShow: 2.55,
                slidesToScroll: 2
            }
            },
            {
            breakpoint: 800,
            settings: {
                slidesToShow: 2,
                centerMode: true,
                slidesToScroll: 1
            }
            },
            {
            breakpoint: 670,
            settings: {
                slidesToShow: 1.8,
                centerMode: true,
                slidesToScroll: 1
            }
            },
            {
            breakpoint: 590,
            settings: {
                slidesToShow: 1.22,
                centerMode: true,
                slidesToScroll: 1
            }
            },
            {
            breakpoint: 500,
            settings: {
                slidesToShow: 1.1,
                centerMode: true,
                slidesToScroll: 1
            }
            }
        ]
    }

    return (
        <section className='search__food'>
            <div className="container">
                <div className="search__food_content">
                    <h2 className='primary-title'>Search by Food</h2>
                    <div className="search__food_buttons">
                        <button className='search__food_buttons_view'>
                            View All
                        </button>
                        <div className="search__food_buttons_slider">
                            <button 
                                onClick={handlePrevClick} 
                                className='search__food_buttons_slider__prev_item' />
                            <button 
                                onClick={handleNextClick} 
                                className='search__food_buttons_slider__next_item' />
                        </div>
                    </div>
                </div>
                <ul className="search__food_slider">
                    <Slider ref={sliderRef} {...settings}>
                        <a className="search__food_card food__card" href="/">
                            <div className="food__card_image">
                                <img src={cardImg1} alt="" />
                            </div>
                            <h3>
                                Pizza
                            </h3>
                        </a>
                        <a className="search__food_card food__card" href="/">
                            <div className="food__card_image">
                                <img src={cardImg1} alt="" />
                            </div>
                            <h3>
                                Pizza
                            </h3>
                        </a>
                        <a className="search__food_card food__card" href="/">
                            <div className="food__card_image">
                                <img src={cardImg1} alt="" />
                            </div>
                            <h3>
                                Pizza
                            </h3>
                        </a>
                        <a className="search__food_card food__card" href="/">
                            <div className="food__card_image">
                                <img src={cardImg1} alt="" />
                            </div>
                            <h3>
                                Pizza
                            </h3>
                        </a>
                        <a className="search__food_card food__card" href="/">
                            <div className="food__card_image">
                                <img src={cardImg1} alt="" />
                            </div>
                            <h3>
                                Pizza
                            </h3>
                        </a>
                        <a className="search__food_card food__card" href="/">
                            <div className="food__card_image">
                                <img src={cardImg1} alt="" />
                            </div>
                            <h3>
                                Pizza
                            </h3>
                        </a>
                        <a className="search__food_card food__card" href="/">
                            <div className="food__card_image">
                                <img src={cardImg1} alt="" />
                            </div>
                            <h3>
                                Pizza
                            </h3>
                        </a>
                        <a className="search__food_card food__card" href="/">
                            <div className="food__card_image">
                                <img src={cardImg1} alt="" />
                            </div>
                            <h3>
                                Pizza
                            </h3>
                        </a>
                        <a className="search__food_card food__card" href="/">
                            <div className="food__card_image">
                                <img src={cardImg1} alt="" />
                            </div>
                            <h3>
                                Pizza
                            </h3>
                        </a>
                        <a className="search__food_card food__card" href="/">
                            <div className="food__card_image">
                                <img src={cardImg1} alt="" />
                            </div>
                            <h3>
                                Pizza
                            </h3>
                        </a>

                    </Slider>
                </ul>
            </div>
        </section>
    );
};

export default SearchFood;