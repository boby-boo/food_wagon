import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Footer, Header, Notification, PrivateRoute, Spinner } from '../index';

// const Header = lazy(() => import('../header/Header'));
const MainPage = lazy(() => import('../../pages/MainPage'));
const RestaurantPage = lazy(() => import('../../pages/RestaurantPage'));
const RestaurantSliderPage = lazy(
    () => import('../../pages/RestaurantSliderPage'),
);
const CartPage = lazy(() => import('../../pages/CartPage'));
// const { Footer } = lazy(() => import('../index'));
const SearchPage = lazy(() => import('../../pages/SearchPage'));
const SignupPage = lazy(() => import('../../pages/SignupPage'));
// const PrivateRoute = lazy(() => import('../privateRoute/PrivateRoute'));
const Page404 = lazy(() => import('../../pages/Page404'));
const OrderPage = lazy(() => import('../../pages/OrderPage'));
// const Notification = lazy(() => import('../notification/Notification'));

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
                                element={<SearchPage />}
                            />
                            <Route
                                exact
                                path="signup"
                                element={<SignupPage />}
                            />
                            <Route
                                exact
                                path="/restaurant/:restaurantName"
                                element={<RestaurantPage />}
                            />
                            <Route
                                exact
                                path="/restaurant/:restaurantName/:productId"
                                element={<RestaurantSliderPage />}
                            />
                            <Route exact path="cart" element={<CartPage />} />
                            <Route
                                exact
                                path="order"
                                element={
                                    <PrivateRoute>
                                        <OrderPage />
                                    </PrivateRoute>
                                }
                            />
                            <Route path="*" element={<Page404 />} />
                        </Routes>
                    </Suspense>
                </main>
                <Notification />
                <Footer />
            </div>
        </Router>
    );
};

export default App;
