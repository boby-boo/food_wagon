import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { dataOfCart } from '../../../reducers/selectors';

const CartProductsPrice = () => {
    const [totalPrice, setTotalPrice] = useState(0);
    const cartData = useSelector(dataOfCart);

    useEffect(() => {
        const price = cartData
            .reduce(
                (acc, currPrice) => acc + currPrice.price * currPrice.quantity,
                0,
            )
            .toFixed(2);
        setTotalPrice(price);
    }, [cartData]);

    return (
        <div className="order__info">
            <h2>Total price: ${totalPrice}</h2>
            <span className="order__info_quantity">
                Product: {cartData.length} qty
            </span>
            <Link to="/order" className="cart__button">
                order
            </Link>
        </div>
    );
};

export default CartProductsPrice;
