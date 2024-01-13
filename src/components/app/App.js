import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Spinner from '../spinner/Spinner';

import '../../style/style.scss';

const Header = lazy(() => import('../header/Header'));
const MainPage = lazy(() => import('../pages/MainPage'));
const Restaurant = lazy(() => import('../restaurant/Restaurant'));
const RestaurantItemCard = lazy(
    () => import('../restaurantItemCard/RestaurantItemCard'),
);
const Cart = lazy(() => import('../cart/Cart'));
const Footer = lazy(() => import('../footer/Footer'));
const SearchedList = lazy(() => import('../searchedList/SearchedList'));
const ProductItem = lazy(() => import('../productItem/ProductItem'));
const Signup = lazy(() => import('../signup/Signup'));
const PrivateRoute = lazy(() => import('../privateRoute/PrivateRoute'));
const Page404 = lazy(() => import('../pages/Page404'));
const Order = lazy(() => import('../order/Order'));

const App = () => {
    return (
        <Router>
            <div className="wrapper">
                <Header />
                <main className="main">
                    <Suspense fallback={<Spinner />}>
                        <Routes>
                            <Route exact path="/" element={<MainPage />} />
                            <Route
                                exact
                                path="search/:category"
                                element={<SearchedList />}
                            />
                            <Route exact path="signup" element={<Signup />} />
                            <Route
                                exact
                                path="/restaurant/:restaurantName"
                                element={<Restaurant />}
                            >
                                <Route index element={<RestaurantItemCard />} />
                                <Route
                                    path=":productId"
                                    element={<ProductItem />}
                                />
                            </Route>
                            <Route exact path="cart" element={<Cart />} />
                            <Route
                                exact
                                path="/order"
                                element={
                                    <PrivateRoute>
                                        <Order />
                                    </PrivateRoute>
                                }
                            />
                            <Route path="*" element={<Page404 />} />
                        </Routes>
                    </Suspense>
                </main>
                <Footer />
            </div>
        </Router>
    );
};

export default App;
