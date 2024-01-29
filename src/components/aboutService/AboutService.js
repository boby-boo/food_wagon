import { motion } from 'framer-motion';
import { aboutServiceData } from '../constants';

const OurService = () => {
    return (
        <motion.section
            className="about-service"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ amount: 0.3 }}
        >
            <div className="container">
                <h2 className="primary-title">How does it work</h2>
                <ul className="about-service__row">
                    {aboutServiceData.map((item, index) => {
                        const { title, description } = item,
                            image = require(
                                `../../resources/icons/about__service/about__service_icon-${
                                    index + 1
                                }.svg`,
                            );
                        return (
                            <li
                                key={`${title}${description}`}
                                className="about-service__row_item row__item"
                            >
                                <div className="row__item_image">
                                    <img src={image} alt="Choose order icon" />
                                </div>
                                <div className="row__item_text">
                                    <h3>{title}</h3>
                                    <p>{description}</p>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </motion.section>
    );
};

export default OurService;
