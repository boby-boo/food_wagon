import DeliveryBanner from "../deliveryBanner/DeliveryBanner";
import AboutService from "../aboutService/AboutService";
import FlashDeals from "../flashDeals/FlashDeals";
import FeatureRestaurants from "../featureRestaurants/FeatureRestaurants";
import FoodCategory from "../foodCategory/FoodCategory";
import FeaturesApp from "../featuresApp/FeaturesApp";
import CardsOfOrders from "../cardsOfOrders/CardsOfOrders";
import Banner from "../banner/Banner";
import PopularItems from "../popularItems/PopularItems";
import SearchedList from "../searchedList/SearchedList";

import { useSelector } from 'react-redux';

const MainPage = () => {
    const filteredProducts = useSelector(state => state.filteredProducts);

    return (
        <>  
        {/* {
            filteredProducts ?
            <SearchedList/> :
            <>

            </>
        } */}
                <DeliveryBanner />
                <PopularItems/>
                <FlashDeals />
                <FeatureRestaurants/>
                <AboutService />
                <FoodCategory />
                <FeaturesApp />
                <CardsOfOrders />
                <Banner />
        </>
    )
};

export default MainPage;