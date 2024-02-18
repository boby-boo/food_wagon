import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useFoodWagonService from '../../services/FoodWagonService';
import {
    RestaurantHeader,
    ProductSlideReview,
    ProductSlide,
    BackButton,
    Spinner,
} from '../../components';

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
                <ProductSlideReview
                    cardsData={cardsData.data}
                    productId={productId}
                    updateProductId={updateProductId}
                />
            </div>
        </section>
    );
};

export default RestaurantSlider;
