import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    dataOfFilteredCards,
    dataOfSearchState,
} from '../../reducers/selectors';
import {
    Filter,
    RestaurantItemCard,
    Button,
    ScrollToTopButton,
    Spinner,
} from '../../components';
import useFoodWagonService from '../../services/FoodWagonService';
import { filteredProductsData } from '../../reducers/filteredDataSlice';
import { searchedState } from '../../reducers/searchStateSlice';
import { searchedListOptions } from '../../components/constants';

const SearchPage = () => {
    const [offset, setOffset] = useState(12);
    const [isLoading, setIsLoading] = useState(false);

    const { getAllProducts } = useFoodWagonService();

    const dispatch = useDispatch();
    const dataCards = useSelector(dataOfFilteredCards);

    const { currentValue, isEmpty } = useSelector(dataOfSearchState);
    const { category } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const currentCategory = searchedListOptions.find(
            item => item.label.toLowerCase() === category,
        ).value;
        getProducts();
        filterLogic([], currentCategory);
    }, [currentValue, offset]);

    useEffect(() => {
        setOffset(12);
    }, [category]);

    const getProducts = () => {
        setIsLoading(true);

        if (currentValue === '' && isEmpty) {
            setOffset(12);
            const data = {
                currentValue,
                isEmpty: false,
            };

            dispatch(searchedState(data));
        }

        getAllProducts(category, currentValue, offset).then(res => {
            dispatch(filteredProductsData(res));
            setIsLoading(false);
        });
    };

    const changeOffset = () => {
        setOffset(prevOffset => prevOffset + 12);
        getProducts();
    };

    const filterLogic = (data, value) => {
        let updateCategory;

        switch (value) {
            case '1':
                updateCategory = 'pizza';
                break;
            case '2':
                updateCategory = 'world';
                break;
            case '3':
                updateCategory = 'sushi';
                break;
            case '4':
                updateCategory = 'taco';
                break;
            case '5':
                updateCategory = 'donuts';
                break;
            default:
                updateCategory = 'all';
        }

        navigate(`/search/${updateCategory}`);
        getAllProducts(updateCategory, currentValue, offset).then(res => {
            dispatch(filteredProductsData(res));
            setIsLoading(false);
        });
    };

    if (dataCards?.length === 0 || !dataCards) {
        return (
            <motion.section
                className="searched-list"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            >
                <div className="container">
                    <div className="searched-list__row">
                        <h1>Search you culinary</h1>
                        <Filter
                            filterLogic={filterLogic}
                            options={searchedListOptions}
                            headerText="Culinary style:"
                            currentSelect={
                                category.charAt(0).toUpperCase() +
                                category.slice(1)
                            }
                        />
                    </div>
                    <div className="searched-list__empty">
                        {dataCards && <h1>No such product found</h1>}
                        <Spinner />
                    </div>
                </div>
            </motion.section>
        );
    }

    return (
        <section className="searched-list">
            <div className="container">
                <div className="searched-list__row">
                    <h1>Search you culinary</h1>
                    <Filter
                        filterLogic={filterLogic}
                        options={searchedListOptions}
                        headerText="Culinary style:"
                        currentSelect={
                            category.charAt(0).toUpperCase() + category.slice(1)
                        }
                    />
                </div>
                <RestaurantItemCard cardsArray={dataCards} />
                {dataCards && dataCards.length % 12 === 0 && (
                    <Button
                        classNameComponent="searched-list__btn"
                        text="View More"
                        isDisabled={isLoading}
                        onclickFunction={changeOffset}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ amount: 0.2 }}
                    />
                )}
            </div>
            <ScrollToTopButton scrollTopValue={300} />
        </section>
    );
};

export default SearchPage;
