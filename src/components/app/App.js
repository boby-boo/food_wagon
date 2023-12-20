import Header from "../header/Header";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";

import RestaurantCards from "../restaurantCards/RestaurantCards";
import MainPage from "../pages/MainPage";
import Cart from "../cart/Cart";
import Footer from "../footer/Footer";

import '../../style/style.scss';

const App = () => {
    return (
        <Router>
            <div className="wrapper">
                <Header />
                    <main className="main">
                        <Routes>
                            <Route exact path='/' element={<MainPage/>}/>
                            <Route path='/:restaurantName/*' element={<RestaurantCards/>} />
                            <Route path='/cart' element={<Cart/>} />
                        </Routes>
                    </main>
                <Footer/>
            </div>
        </Router>
    )
};

export default App;
