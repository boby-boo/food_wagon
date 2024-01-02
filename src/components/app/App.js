import { lazy, Suspense } from 'react';
import Spinner from '../spinner/Spinner';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import '../../style/style.scss';

const Header = lazy(() => import('../header/Header'));
const MainPage = lazy(() => import('../pages/MainPage'));
const Restaurant = lazy(() => import('../restaurant/Restaurant'));
const RestaurantItemCard = lazy(() => import('../restaurantItemCard/RestaurantItemCard'));
const Cart = lazy(() => import('../cart/Cart'));
const Footer = lazy(() => import('../footer/Footer'));
const SearchedList = lazy(() => import('../searchedList/SearchedList')) ;
const ProductItem = lazy(() => import('../productItem/ProductItem'));
const Signup = lazy(() => import('../signup/Signup'));


const App = () => {
    return (
        <Router>
            <div className='wrapper'>
                <Header />
                    <main className='main'>
                        <Suspense fallback={<Spinner/>}>
                            <Routes>
                                <Route exact path='/' element={<MainPage/>}/>
                                <Route path='/search/:category' element={<SearchedList/>}/>
                                <Route path='/signup' element={<Signup/>}/>
                                <Route path='/:restaurantName' element={<Restaurant/>}>
                                    <Route index element={<RestaurantItemCard/>} />
                                    <Route path=':productId' element={<ProductItem />}/>
                                </Route>
                                <Route path='/cart' element={<Cart/>} />
                            </Routes>
                        </Suspense>
                    </main>
                <Footer/>
            </div>
        </Router>
    )
};

export default App;
