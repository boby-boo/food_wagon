import Header from "../header/Header";
import DeliveryBanner from '../deliveryBanner/DeliveryBanner';
import AboutService from '../aboutService/AboutService';
import FlashDeals from '../flashDeals/FlashDeals';

const App = () => {
  return (
    <>
      <Header/>
      <DeliveryBanner/>
      <FlashDeals/>
      <AboutService/>
    </>
  );
}

export default App;
