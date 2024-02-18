import Slider from 'react-slick';
import { motion, AnimatePresence } from 'framer-motion';
import { ProductSlideDescription } from '../index';
import { productItemSliderSettings } from '../utils';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const SamplePrevArrow = props => {
    const { onClick } = props;
    return <div className="product__prev_btn" onClick={onClick} />;
};

const SampleNextArrow = props => {
    const { onClick } = props;
    return <div className="product__next_btn" onClick={onClick} />;
};

const ProductSlide = ({
    productId,
    updateProductId,
    cardsData,
    setUpdateProductId,
}) => {
    const handleSlideChange = index => {
        if (cardsData) {
            setUpdateProductId(cardsData[index].id);
        }
    };

    productItemSliderSettings.prevArrow = <SamplePrevArrow />;
    productItemSliderSettings.nextArrow = <SampleNextArrow />;

    const renderCards = arr => {
        const id = updateProductId || productId;

        const cards = arr.map(card => (
            <ProductSlideDescription card={card} key={card.id} />
        ));

        const initialIndex = arr.findIndex(item => item.id === id);

        return (
            <>
                <div className="product__slider">
                    <Slider
                        {...productItemSliderSettings}
                        afterChange={handleSlideChange}
                        initialSlide={initialIndex}
                    >
                        {cards}
                    </Slider>
                </div>
                <div className="product__about">
                    <h2>Description: </h2>
                    <AnimatePresence mode="popLayout">
                        <motion.div
                            key={initialIndex}
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 10, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            {arr[initialIndex].description}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </>
        );
    };

    const content = renderCards(cardsData);

    return <>{content}</>;
};

export default ProductSlide;
