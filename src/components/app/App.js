import Header from "../header/Header";
import Restaurant from "../restaurant/Restaurant";
import MainPage from "../pages/MainPage";
import Cart from "../cart/Cart";
import Footer from "../footer/Footer";
import SearchedList from "../searchedList/SearchedList";
import ProductItem from "../productItem/ProductItem";

import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import { useSelector } from "react-redux"

import '../../style/style.scss';

const App = () => {
    const filteredProducts = useSelector(state => state.filteredProducts);

    return (
        <Router>
            <div className="wrapper">
                <Header />
                    <main className="main">
                        {/* {filteredProducts && <SearchedList/>} */}
                        <Routes>
                            <Route exact path='/' element={<MainPage/>}/>
                            <Route path='/search' element={<SearchedList/>}/>
                            <Route path='/:restaurantName/*' element={<Restaurant/>} />
                            {/* <Route exact path=":productId" element={<ProductItem />} /> */}
                            <Route path='/cart' element={<Cart/>} />
                        </Routes>
                    </main>
                <Footer/>
            </div>
        </Router>
    )
};

export default App;
