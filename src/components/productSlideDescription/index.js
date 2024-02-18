import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { dataOfCart } from '../../reducers/selectors';
import { addToCart } from '../../reducers/cartSlice';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const ProductSlideDescription = ({ card }) => {
    const [productData, setProductData] = useState(null);
    const cartData = useSelector(dataOfCart);
    const dispatch = useDispatch();

    const { name, price, image, weight, ingredients, id } = card;
    const img = require(`../../resources/${image}`);
    const ing = ingredients.join(', ');

    useEffect(() => {
        const checkDuplicate = cartData.find(item => item.id === id);
        const count = checkDuplicate ? checkDuplicate.quantity : 0;

        setProductData({
            ...card,
            quantity: count,
        });
    }, []);

    const handleClick = value => {
        if (productData.quantity <= 0 && value === -1) return;

        const currentQty = productData.quantity + value;
        setProductData({
            ...productData,
            quantity: currentQty,
        });
    };

    const addProductToCart = item => {
        if (item.quantity === 0) return;
        dispatch(addToCart(item));
    };

    return (
        <>
            <div className="product__row">
                <div className="product__image">
                    <img src={img} alt={name} />
                </div>
                <div className="product__content">
                    <div className="product__info">
                        <h1 className="product__content-title">
                            {name} <span>({weight}g)</span>
                        </h1>
                    </div>
                    <div className="product__controls">
                        <div className="product__controls_price">
                            ${price.toFixed(2)}
                        </div>
                        <div className="product__controls_buttons">
                            <button
                                type="button"
                                className="btn__icon_minus"
                                onClick={() => handleClick(-1)}
                            />
                            <span>{productData?.quantity}</span>
                            <button
                                type="button"
                                className="btn__icon_plus"
                                onClick={() => handleClick(+1)}
                            />
                        </div>
                    </div>
                    <div className="product__description">
                        <h3>Ingredients:</h3>
                        <p>{ing}</p>
                    </div>
                    <button
                        type="button"
                        className="product__button"
                        onClick={() => addProductToCart(productData)}
                    >
                        Add to cart
                    </button>
                </div>
            </div>
        </>
    );
};

export default ProductSlideDescription;
