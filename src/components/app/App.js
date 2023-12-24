import Header from "../header/Header";
import Restaurant from "../restaurant/Restaurant";
import MainPage from "../pages/MainPage";
import Cart from "../cart/Cart";
import Footer from "../footer/Footer";
import SearchedList from "../searchedList/SearchedList";

import { BrowserRouter as Router, Route, Routes} from "react-router-dom";

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
