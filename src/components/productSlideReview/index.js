import { motion } from 'framer-motion';
import { ClientIcon, RateIcon } from '../icons';

const ProductSlideReview = ({ cardsData, updateProductId, productId }) => {
    const id = updateProductId || productId;
    const card = cardsData.find(item => item.id === id);

    if (card.review.length === 0) {
        return (
            <motion.div
                className="review"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ amount: 0.1 }}
            >
                <h2 className="review__title">
                    There are no reviews for this product yet.
                </h2>
            </motion.div>
        );
    }

    const renderReview = obj => {
        const content = obj.review.map(item => {
            const { author, rate, comment, date } = item,
                rateStart = [];

            for (let i = 1; i <= rate; i++) {
                rateStart.push(<RateIcon key={i} />);
            }

            return (
                <motion.li
                    key={author + comment + date}
                    className="review-card"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                >
                    <div className="review-card__info">
                        <div className="review-card__author">
                            <div className="review-card__author_image">
                                <img src={ClientIcon} alt="logo user" />
                            </div>
                            <div className="review-card__author_desc">
                                <h3>{author}</h3>
                                <span>{date}</span>
                                <div className="review-card__author_desc-rate">
                                    {rateStart}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="review-card__message">{comment}</div>
                </motion.li>
            );
        });

        return content;
    };

    const content = renderReview(card);

    return (
        <div className="review">
            <h2 className="review__title">Review</h2>
            <ul className="review__row">{content}</ul>
        </div>
    );
};

export default ProductSlideReview;
