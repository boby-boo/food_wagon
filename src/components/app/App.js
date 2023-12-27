import Header from "../header/Header";
import MainPage from "../pages/MainPage";
import Restaurant from "../restaurant/Restaurant";
import RestaurantItemCard from "../restaurantItemCard/RestaurantItemCard";
import Cart from "../cart/Cart";
import Footer from "../footer/Footer";
import SearchedList from "../searchedList/SearchedList";
import ProductItem from "../productItem/ProductItem";
import Signup from "../signup/Signup";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import '../../style/style.scss';

const App = () => {
    return (
        <Router>
            <div className="wrapper">
                <Header />
                    <main className="main">
                        <Routes>
                            <Route exact path='/' element={<MainPage/>}/>
                            <Route path='/search' element={<SearchedList/>}/>
                            <Route path='/signup' element={<Signup/>}/>
                            <Route path='/:restaurantName' element={<Restaurant/>}>
                                <Route index element={<RestaurantItemCard/>} />
                                <Route path=':productId' element={<ProductItem />}/>
                            </Route>
                            <Route path='/cart' element={<Cart/>} />
                        </Routes>
                    </main>
                <Footer/>
            </div>
        </Router>
    )
};

export default App;
