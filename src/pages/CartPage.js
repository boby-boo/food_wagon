import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { dataOfCart } from '../reducers/selectors';
import CartProductsList from '../components/cartList/cartProductsList/CartProductsList';
import CartProductsPrice from '../components/cartList/cartProductsPrice/CartProductsPrice';

const CartPage = () => {
    const cartData = useSelector(dataOfCart);

    if (cartData.length === 0) {
        return (
            <motion.div
                className="cart__empty"
                initial={{ opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
            >
                <p>Cart is empty, add something from the menu</p>
                <Link to="/" className="cart__button">
                    Select products
                </Link>
            </motion.div>
        );
    }

    return (
        <section className="cart">
            <div className="container">
                <h1>Order</h1>
                <div className="order__row">
                    <CartProductsList />
                    <CartProductsPrice />
                </div>
            </div>
        </section>
    );
};

export default CartPage;
