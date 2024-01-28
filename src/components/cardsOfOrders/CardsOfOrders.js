import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import './cardsOfOrders.scss';

const CardsOfOrders = () => {
    const items = [
        {
            title: 'Best deals',
            subtitle: 'Crispy Sandwiches',
            description:
                'Enjoy the large size of sandwiches. Complete perfect slice of sandwiches.',
            link: '/restaurant/pizza-hub',
        },
        {
            title: 'Celebrate parties with',
            subtitle: 'Fried Chicken',
            description:
                'Get the best fried chicken smeared with a lip smacking lemon chili flavor. Check out best deals for fried chicken.',
            link: '/restaurant/kuakata-fried-chicken',
        },
        {
            title: 'Wanna eat hot & spicy',
            subtitle: 'Pizza?',
            description:
                'Pair up with a friend and enjoy the hot and crispy pizza pops. Try it with the best deals.',
            link: '/search/pizza',
        },
    ];

    return (
        <section className="cards-of-orders orders">
            <div className="container">
                <ul className="orders__row">
                    {items.map((item, index) => {
                        const { title, subtitle, description, link } = item,
                            currentImage = require(
                                `../../resources/images/order__card_image-${
                                    index + 1
                                }.png`,
                            );
                        return (
                            <motion.li
                                key={index}
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
                                    <img src={currentImage} alt="Order card" />
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
