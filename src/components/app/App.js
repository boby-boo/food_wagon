import Header from "../header/Header";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";

import RestaurantCards from "../restaurantCards/RestaurantCards";
import MainPage from "../pages/MainPage";

const App = () => {
    return (
        <Router>
            <Header />
            <Routes>
                <Route exact path='/' element={<MainPage/>}/>
                <Route path='/:restaurantName/*' element={<RestaurantCards/>} />
            </Routes>
        </Router>
    )
};

export default App;
