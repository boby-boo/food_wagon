import React, { useEffect, useState } from 'react';
import Filter from '../filter/Filter';
import Spinner from '../spinner/Spinner';

import useFoodWagonService from '../../services/FoodWagonService';
import { Link, useNavigate, Outlet } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import { updateDataCards } from '../../actions';
import { useDispatch } from 'react-redux';

import './restaurant.scss';

const Restaurant = () => {
    const [cards, setCards] = useState(null);
    const [initialCards, setInitialCards] = useState(null);

    const { restaurantName } = useParams();
    const   navigate = useNavigate(),
            { getRestaurant } = useFoodWagonService(),
            dispatch = useDispatch();

    const options = [
        { value: '0', label: 'Featured' },
        { value: '1', label: 'High to Low' },
        { value: '2', label: 'Low to High' },
    ];

    useEffect(() => {
        getRestaurant(restaurantName)
            .then((res) => {
                setInitialCards(JSON.parse(JSON.stringify(res)));
                setCards(res);
                dispatch(updateDataCards(res.data))
            });
    }, [restaurantName]);

    if (!cards) {
        return (
            <Spinner />
        );
    }

    const getAveragePrice = (data) => {
        const averagePrice = (data.reduce((acc, cur) => acc + cur.price, 0) / data.length).toFixed(2);
        return averagePrice;
    };

    const filterLogic = (cards, value) => {
        let updateData;

        switch (value) {
            case '1':
                updateData = filteredMore();
                break;
            case '2':
                updateData = filteredLess();
                break;
            default:
                updateData = [...initialCards.data];
                break;
        }

        setCards({
            ...cards,
            data: updateData,
        });

        dispatch(updateDataCards(updateData))

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

    const   restaurantLogo = require(`../../resources/${cards.logo}`),
            averagePrice = getAveragePrice(cards.data);

    return (
        <section className='restaurant'>
            <div className='container'>
                <button onClick={() => navigate(-1)} className='back-btn'>
                    <div className='back-btn__back'></div>
                    <span>Back</span>
                </button>
                <div className='restaurant__row'>
                    <Link
                        className='restaurant__card'
                        to={`/${restaurantName}`}>
                        <div className='restaurant__card_image'>
                            <img src={restaurantLogo} alt={cards.partnerName} />
                        </div>
                        <div className='restaurant__card_description'>
                            <h1>{cards.partnerName}</h1>
                            <span>{cards.rate}</span>
                        </div>
                    </Link>
                    <div className='restaurant__card_price'>
                        Average price: <span>${averagePrice}</span>
                    </div>
                    <Filter 
                        data={cards} 
                        filterLogic={filterLogic} 
                        options={options} 
                        currentSelect='Featured'
                        headerText='Filter by:'
                        />
                </div>
                <Outlet/>
            </div>
        </section>
    );
};

// const Filter = ({ data, filteredData }) => {
//     const [selectedValue, setSelectedValue] = useState('Featured');
//     const [isVisible, setIsVisible] = useState(false);


//     const clickHandler = (e) => {
//         setSelectedValue(e.target.textContent);
//     };

//     const options = [
//         { value: '0', label: 'Featured' },
//         { value: '1', label: 'High to Low' },
//         { value: '2', label: 'Low to High' },
//         // { value: '3', label: 'value3' },
//         // { value: '4', label: 'value4' },
//         // { value: '5', label: 'value5' },
//     ];

//     const renderItems = (arr) => {
//         const items = arr.map((item, index) => {
//             const { value, label } = item;

//             return (
//                 <li
//                     onClick={(e) => {
//                         clickHandler(e);
//                         setIsVisible(false);
//                         filteredData(data, value);
//                     }}
//                     key={index}
//                     value={value}
//                 >
//                     {label}
//                 </li>
//             );
//         });

//         return <ul className='filter__body'>{items}</ul>;
//     };

//     const content = renderItems(options);

//     return (
//         <>
//             <div className='filter'>
//                 <div className='filter__header'>
//                     Filter by:
//                     <div
//                         className='filter__header_value'
//                         onClick={() => setIsVisible(!isVisible)}
//                     >
//                         {selectedValue}
//                         <span className='filter__icon'></span>
//                     </div>
//                 </div>
//                 {isVisible && content}
//             </div>
//             {isVisible && (
//                 <div
//                     className='overflow'
//                     onClick={() => setIsVisible(false)}
//                 ></div>
//             )}
//         </>
//     );
// };

export default Restaurant;