import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {
    Header,
    Footer,
    Notification,
    PrivateRoute,
    Spinner,
} from './components/index';

const MainPage = lazy(() => import('./pages/mainPage'));
const RestaurantPage = lazy(() => import('./pages/restaurantPage'));
const RestaurantSliderPage = lazy(() => import('./pages/restaurantSliderPage'));
const CartPage = lazy(() => import('./pages/cartPage'));
const SearchPage = lazy(() => import('./pages/searchPage'));
const SignupPage = lazy(() => import('./pages/signupPage'));
const Page404 = lazy(() => import('./pages/page404'));
const OrderPage = lazy(() => import('./pages/orderPage'));

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
