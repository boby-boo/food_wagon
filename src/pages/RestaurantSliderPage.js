import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useFoodWagonService from '../services/FoodWagonService';
import ProductSlide from '../components/productSliderItem/ProductSlide';
import ProductSlideReview from '../components/productSliderItem/ProductSlideReview';
import Spinner from '../components/spinner/Spinner';
import RestaurantHeader from '../components/restaurantHeader/RestaurantHeader';
import BackButton from '../components/backButton/BackButton';

const RestaurantSlider = () => {
    const [updateProductId, setUpdateProductId] = useState(null);
    const [cardsData, updateCardsData] = useState(null);
    const { restaurantName, productId } = useParams();
    const { getRestaurant } = useFoodWagonService();

    useEffect(() => {
        getRestaurant(restaurantName).then(res => {
            updateCardsData(res);
        });
    }, [restaurantName]);

    if (!cardsData) {
        return <Spinner />;
    }

    return (
        <section className="product">
            <div className="container">
                <BackButton />
                <RestaurantHeader
                    restaurantName={restaurantName}
                    cardData={cardsData}
                    isFilterVisible={false}
                />
                <ProductSlide
                    restaurantName={restaurantName}
                    cardsData={cardsData.data}
                    updateProductId={updateProductId}
                    productId={productId}
                    setUpdateProductId={setUpdateProductId}
                />
                <div className="review">
                    <h2 className="review__title">Review</h2>
                    <ProductSlideReview
                        cardsData={cardsData.data}
                        productId={productId}
                        updateProductId={updateProductId}
                    />
                </div>
            </div>
        </section>
    );
};

export default RestaurantSlider;
