import Header from "../header/Header";
import DeliveryBanner from '../deliveryBanner/DeliveryBanner';
import AboutService from '../aboutService/AboutService';
import FlashDeals from '../flashDeals/FlashDeals';
import PopularItems from '../popularItems/PopularItems'
import FeatureRestaurants from '../featureRestaurants/FeatureRestaurants';
import SearchFood from "../searchFood/SearchFood";

const App = () => {
  return (
    <>
      <Header/>
      <DeliveryBanner/>
      <FlashDeals/>
      <AboutService/>
      <PopularItems/>
      <FeatureRestaurants/>
      <SearchFood/>
    </>
  );
}

export default App;
