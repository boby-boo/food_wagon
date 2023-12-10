import Header from "../header/Header";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";

import RestaurantCards from "../restaurantCards/RestaurantCards";
import MainPage from "../pages/MainPage";
import ProductItem from "../productItem/ProductItem";

const App = () => {
    return (
        <Router>
            <Header />
            <Routes>
                <Route exact path='/' element={<MainPage/>}/>
                <Route exact path='/restaurant/:restaurantName' element={<RestaurantCards/>}/>
                {/* <Route exact path='restaurant/:restaurantName/:productId' element={<ProductItem/>}/> */}
            </Routes>
        </Router>
    )
};

export default App;
