import { useEffect, useRef, useState } from 'react';
import Slider from 'react-slick';
import { useHttp } from '../../hooks/http.hook';

import { Link } from 'react-router-dom';
import Spinner from '../spinner/Spinner';

import './searchFood.scss';

const SearchFood = () => {
    const [items, setItems] = useState();
    const sliderRef = useRef(null);
    const { request } = useHttp();

    useEffect(() => {
        request('http://localhost:3001/partners')
            .then(res => setItems(res))
    }, []);

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
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1824,
                settings: {
                slidesToShow: 5,
                slidesToScroll: 1,
                arrows: false
            }
            },
            {
            breakpoint: 1300,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 1
            }
            },
            {
            breakpoint: 1100,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 1
            }
            },
            {
            breakpoint: 950,
            settings: {
                slidesToShow: 2.55,
                slidesToScroll: 1
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

    if (!items) {
        return (
            <Spinner/>
        )
    };

    const renderItems = (arr) => {
        const items = arr.map(item => {
            const {partnerName, kitchen, image, products} = item,
                    img = require(`../../resources/${image}`);

            return (
                <Link 
                    className="search__food_card food__card" 
                    to={`/${products}`}
                    key={img}>
                    <div className="food__card_image">
                        <img src={img} alt={partnerName} />
                    </div>
                    <h3>{kitchen}</h3>
                </Link>
            )
        })

        return (
            <ul className="search__food_slider">
                <Slider ref={sliderRef} {...settings}>
                    {items}
                </Slider>
            </ul>
        )
    }

    const contentItems = renderItems(items);

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
                    {contentItems}
                </ul>
            </div>
        </section>
    );
};

export default SearchFood;