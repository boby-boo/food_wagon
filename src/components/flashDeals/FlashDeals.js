import React from 'react';

import dealCardImage from '../../resources/images/deal__card_img1.png';
import dealCardImage1 from '../../resources/images/deal__card_img2.png';
import dealCardImage2 from '../../resources/images/deal__card_img3.png';
import dealCardImage3 from '../../resources/images/deal__card_img4.png';

import { motion } from 'framer-motion';
import './flashDeals.scss';

const FlashDeals = () => {
    return (
        <motion.section 
            className='flash__deals'
            initial={{ opacity: 0 }}
            viewport={{ amount: 0.3 }}
            whileInView={{ opacity: 1}}>
            <div className='container'>
                <ul className='deal__cards_row'>
                    <li className='primary__card deal__card'>
                        <a href='/'>
                            <div className='primary__card_content deal__card_content card__content'>
                                <div className='primary__card_image'>
                                    <img src={dealCardImage} alt='deal card image' />
                                </div>
                                <div className='card__content_discount'>
                                    15
                                    <div className='card__content_discount-items'>
                                        %<span>Off</span>
                                    </div>
                                </div>
                            </div>
                            <div className='deal__card_description'>
                                <h3>Greys Vage</h3>
                                <div className='deal__card_description-remaining main__footnote'>
                                    6 Days Remaining
                                </div>
                            </div>
                        </a>
                    </li>
                    <li className='primary__card deal__card'>
                        <a href='/'>
                            <div className='primary__card_content deal__card_content card__content'>
                                <div className='primary__card_image'>
                                    <img src={dealCardImage1} alt='deal card image' />
                                </div>
                                <div className='card__content_discount'>
                                    10
                                    <div className='card__content_discount-items'>
                                        %<span>Off</span>
                                    </div>
                                </div>
                            </div>
                            <div className='deal__card_description'>
                                <h3>Greys Vage</h3>
                                <div className='deal__card_description-remaining main__footnote'>
                                    6 Days Remaining
                                </div>
                            </div>
                        </a>
                    </li>
                    <li className='primary__card deal__card'>
                        <a href='/'>
                            <div className='primary__card_content deal__card_content card__content'>
                                <div className='primary__card_image'>
                                    <img src={dealCardImage2} alt='deal card image' />
                                </div>
                                <div className='card__content_discount'>
                                    25
                                    <div className='card__content_discount-items'>
                                        %<span>Off</span>
                                    </div>
                                </div>
                            </div>
                            <div className='deal__card_description'>
                                <h3>Greys Vage</h3>
                                <div className='deal__card_description-remaining main__footnote'>
                                    7 Days Remaining 
                                </div>
                            </div>
                        </a>
                    </li>
                    <li className='primary__card deal__card'>
                        <a href='/'>
                            <div className='primary__card_content deal__card_content card__content'>
                                <div className='primary__card_image '>
                                    <img src={dealCardImage3} alt='deal card image' />
                                </div>
                                <div className='card__content_discount'>
                                    20
                                    <div className='card__content_discount-items'>
                                        %<span>Off</span>
                                    </div>
                                </div>
                            </div>
                            <div className='deal__card_description'>
                                <h3>Greys Vage</h3>
                                <div className='deal__card_description-remaining main__footnote'>
                                    8 Days Remaining 
                                </div>
                            </div>
                        </a>
                    </li>
                </ul>
            </div>
        </motion.section>
    );
};

export default FlashDeals;