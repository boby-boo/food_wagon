import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cardsOfOrdersData } from '../constants';

const CardsOfOrders = () => {
    return (
        <section className="cards-of-orders orders">
            <div className="container">
                <ul className="orders__row">
                    {cardsOfOrdersData.map((item, index) => {
                        const { title, subtitle, description, link } = item,
                            currentImage = require(
                                `../../resources/images/order__card_image-${
                                    index + 1
                                }.png`,
                            );
                        return (
                            <motion.li
                                key={`${title}${description}`}
                                initial={{ y: 10, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                viewport={{ amount: 0.2 }}
                                className="orders__row_card order__card"
                            >
                                <div className="order__card_description">
                                    <div className="order__card_text">
                                        <h2 className="primary-title">
                                            {title} <span>{subtitle}</span>
                                        </h2>
                                        <p>{description}</p>
                                    </div>
                                    <Link
                                        to={link}
                                        className="primary__button restaurants__button order__card_button"
                                    >
                                        Proceed to order
                                    </Link>
                                </div>
                                <div className="order__card_image">
                                    <img src={currentImage} alt={title} />
                                </div>
                            </motion.li>
                        );
                    })}
                </ul>
            </div>
        </section>
    );
};

export default CardsOfOrders;
