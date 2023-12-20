import DeliveryBanner from "../deliveryBanner/DeliveryBanner";
import AboutService from "../aboutService/AboutService";
import FlashDeals from "../flashDeals/FlashDeals";
import FeatureRestaurants from "../featureRestaurants/FeatureRestaurants";
import SearchFood from "../searchFood/SearchFood";
import FeaturesApp from "../featuresApp/FeaturesApp";
import CardsOfOrders from "../cardsOfOrders/CardsOfOrders";
import Banner from "../banner/Banner";
import PopularItems from "../popularItems/PopularItems";

const MainPage = () => {
    return (
        <>
            <DeliveryBanner />
            <PopularItems/>
            <FlashDeals />
            <FeatureRestaurants/>
            <AboutService />
            <SearchFood />
            <FeaturesApp />
            <CardsOfOrders />
            <Banner />
        </>
    )
};

export default MainPage;