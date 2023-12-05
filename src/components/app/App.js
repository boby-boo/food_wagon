import Header from "../header/Header";
import DeliveryBanner from "../deliveryBanner/DeliveryBanner";
import AboutService from "../aboutService/AboutService";
import FlashDeals from "../flashDeals/FlashDeals";
import PopularItems from "../popularItems/PopularItems";
import FeatureRestaurants from "../featureRestaurants/FeatureRestaurants";
import SearchFood from "../searchFood/SearchFood";
import FeaturesApp from "../featuresApp/FeaturesApp";
import CardsOfOrders from "../cardsOfOrders/CardsOfOrders";
import Banner from "../Banner/Banner";
import RestaurantCards from "../restaurantCards/RestaurantCards";

const App = () => {
    return (
        <>
            <Header />
            {/* <RestaurantCards /> */}
            <DeliveryBanner />
            <FlashDeals />
            <AboutService />
            <PopularItems />
            <FeatureRestaurants />
            <SearchFood />
            <FeaturesApp />
            <CardsOfOrders />
            <Banner />
        </>
    );
};

export default App;
