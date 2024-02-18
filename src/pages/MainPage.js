import { DeliveryBanner } from '../components';
import AboutService from '../components/aboutService/AboutService';
import FlashDeals from '../components/flashDeals/FlashDeals';
import FeatureRestaurants from '../components/featureRestaurants/FeatureRestaurants';
import FoodCategory from '../components/foodCategory/FoodCategory';
import FeaturesApp from '../components/featuresApp/FeaturesApp';
import CardsOfOrders from '../components/cardsOfOrders/CardsOfOrders';
import Banner from '../components/banner/Banner';
import PopularItems from '../components/popularItems/PopularItems';
import ErrorBoundary from '../components/errorBoundary/ErrorBoundary';
import ScrollToTopButton from '../components/scrollToTopButton/ScrollToTopButton';

const MainPage = () => {
    return (
        <>
            <DeliveryBanner />
            <ErrorBoundary>
                <PopularItems />
            </ErrorBoundary>
            <FlashDeals />
            <ErrorBoundary>
                <FeatureRestaurants />
            </ErrorBoundary>
            <AboutService />
            <ErrorBoundary>
                <FoodCategory />
            </ErrorBoundary>
            <FeaturesApp />
            <CardsOfOrders />
            <Banner />
            <ScrollToTopButton scrollTopValue={500} />
        </>
    );
};

export default MainPage;
