import DeliveryBanner from '../deliveryBanner/DeliveryBanner';
import AboutService from '../aboutService/AboutService';
import FlashDeals from '../flashDeals/FlashDeals';
import FeatureRestaurants from '../featureRestaurants/FeatureRestaurants';
import FoodCategory from '../foodCategory/FoodCategory';
import FeaturesApp from '../featuresApp/FeaturesApp';
import CardsOfOrders from '../cardsOfOrders/CardsOfOrders';
import Banner from '../banner/Banner';
import PopularItems from '../popularItems/PopularItems';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';

const MainPage = () => {
    return (
        <>  
                <DeliveryBanner />
                <ErrorBoundary>
                    <PopularItems/>
                </ErrorBoundary>
                <FlashDeals />
                <ErrorBoundary>
                    <FeatureRestaurants/>
                </ErrorBoundary>
                <AboutService />
                <ErrorBoundary>
                    <FoodCategory />
                </ErrorBoundary>
                <FeaturesApp />
                <CardsOfOrders />
                <Banner />
        </>
    )
};

export default MainPage;