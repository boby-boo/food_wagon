import Header from "../header/Header";
import DeliveryBanner from '../deliveryBanner/DeliveryBanner';
import AboutService from '../aboutService/AboutService';
import FlashDeals from '../flashDeals/FlashDeals';
import PopularItems from '../popularItems/PopularItems'

const App = () => {
  return (
    <>
      <Header/>
      {/* <DeliveryBanner/>
      <FlashDeals/>
      <AboutService/> */}
      <PopularItems/>
    </>
  );
}

export default App;
