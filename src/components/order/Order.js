import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { motion } from 'framer-motion';
import Input from '../input/Input';
import useFoodWagonService from '../../services/FoodWagonService';
import { ReactComponent as UserIcon } from '../../resources/icons/user__icon.svg';
import { ReactComponent as PhoneIcon } from '../../resources/icons/phone__icon.svg';
import { ReactComponent as MapIcon } from '../../resources/icons/map__icon.svg';
import { ReactComponent as StreetIcon } from '../../resources/icons/street__icon.svg';
import { ReactComponent as HouseIcon } from '../../resources/icons/house__icon.svg';
import { ReactComponent as LevelIcon } from '../../resources/icons/level__icon.svg';
import { ReactComponent as EmailIcon } from '../../resources/icons/email__icon.svg';
import { ReactComponent as ApartmentIcon } from '../../resources/icons/apartment__icon.svg';
import { ReactComponent as CardIcon } from '../../resources/icons/credit-card__icon.svg';
import { ReactComponent as WalletIcon } from '../../resources/icons/wallet__icon.svg';

import './order.scss';

const stepAnimation = {
    hidden: {
        y: -20,
        opacity: 0,
    },
    visible: {
        y: 0,
        opacity: 1,
    },
    titleHidden: {
        y: 40,
        opacity: 0,
    },
    titleVisible: {
        y: 0,
        opacity: 1,
    },
};

const Order = () => {
    const {
        email: userEmail,
        name: userName,
        phone: userPhone,
        city: userCity,
        street: userStreet,
        house: userHouse,
        level: userLevel,
        apartment: userApartment,
        id,
    } = JSON.parse(localStorage.getItem('user'));
    const [delivery, setDelivery] = useState({
        id: id || '',
        name: userName || '',
        email: userEmail || '',
        phone: userPhone || '',
        city: userCity || '',
        street: userStreet || '',
        house: userHouse || '',
        level: userLevel || '',
        apartment: userApartment || '',
        payment: '',
    });
    const [stepActive, setStepActive] = useState(null);
    const [isCompleteStep, setIsCompleteStep] = useState({
        personal: false,
        deliveryInfo: false,
        paymentInfo: false,
    });
    const { postOrder } = useFoodWagonService();
    const cart = useSelector(state => state.cart.cart);
    const steps = ['personal-data', 'address-data', 'type-delivery'];

    useEffect(() => {
        setStepActive(steps[0]);
    }, []);

    useEffect(() => {
        checkComplete();
    }, [delivery]);

    const changeStepOrder = e => {
        const { type, value } = e.target;

        if (
            (stepActive === 'personal-data' && !isCompleteStep.personal) ||
            (value === 'type-delivery' && !isCompleteStep.deliveryInfo)
        )
            return;

        if (stepActive === 'address-data' && !isCompleteStep.deliveryInfo) {
            if (value === 'personal-data') {
                setStepActive(value);
            }
            return;
        }

        if (type === 'button') {
            const index = steps.findIndex(item => stepActive === item);

            index + 1 === steps.length
                ? setStepActive(steps[0])
                : setStepActive(steps[index + 1]);

            return;
        }

        setStepActive(value);
    };

    const handleSubmit = e => {
        e.preventDefault();

        const {
            name,
            email,
            phone,
            city,
            street,
            house,
            level,
            apartment,
            payment,
        } = delivery;

        const totalPrice = cart
            .reduce((acc, item) => item.price * item.quantity + acc, 0)
            .toFixed(2);

        const orderInfo = {
            id: uuidv4(),
            infoAboutUser: {
                id,
                name,
                email,
                phone,
            },
            infoAboutDelivery: {
                city,
                street,
                house,
                level,
                apartment,
            },
            typePayment: payment,
            totalPrice,
            order: [...cart],
            dateOrder: new Date(),
        };

        postOrder(JSON.stringify(orderInfo));

        setDelivery({
            id: id || '',
            name: name || '',
            email: userEmail || '',
            phone: '',
            city: '',
            street: '',
            house: '',
            level: '',
            apartment: '',
            payment: '',
        });
    };

    const handlePaymentType = e => {
        setDelivery({
            ...delivery,
            payment: e.target.value,
        });

        setIsCompleteStep({
            ...isCompleteStep,
            payment: true,
        });
    };

    const checkComplete = () => {
        const {
            name,
            email,
            phone,
            city,
            street,
            house,
            level,
            apartment,
            payment,
        } = delivery;

        const personal =
                name !== '' &&
                email !== '' &&
                /@.*\./.test(email) &&
                phone !== '' &&
                phone.length === 10,
            deliveryInfo =
                city !== '' &&
                street !== '' &&
                house !== '' &&
                level !== '' &&
                apartment !== '',
            paymentInfo = payment !== '';

        setIsCompleteStep({
            ...isCompleteStep,
            deliveryInfo,
            personal,
            paymentInfo,
        });
    };

    return (
        <section className="order-info">
            <div className="container">
                <div className="steps__row">
                    <input
                        onChange={changeStepOrder}
                        type="radio"
                        name="step"
                        className="step__input_personal"
                        id="personal-data"
                        value="personal-data"
                        checked={stepActive === 'personal-data'}
                    />
                    <label
                        htmlFor="personal-data"
                        className={`steps__row_step ${
                            isCompleteStep.personal && 'step__complete'
                        }`}
                    >
                        <div className="circle">1</div>
                        <div className="dotted__row">
                            <span className="dotted"></span>
                            <span className="dotted"></span>
                            <span className="dotted"></span>
                            <span className="dotted"></span>
                        </div>
                    </label>
                    <input
                        onChange={changeStepOrder}
                        type="radio"
                        name="step"
                        className="step__input_address"
                        id="address-data"
                        value="address-data"
                        checked={stepActive === 'address-data'}
                    />
                    <label
                        htmlFor="address-data"
                        className={`steps__row_step ${
                            isCompleteStep.deliveryInfo && 'step__complete'
                        }`}
                    >
                        <div className="circle">2</div>
                        <div className="dotted__row">
                            <span className="dotted"></span>
                            <span className="dotted"></span>
                            <span className="dotted"></span>
                            <span className="dotted"></span>
                        </div>
                    </label>
                    <input
                        onChange={changeStepOrder}
                        type="radio"
                        name="step"
                        className="step__input_delivery"
                        id="type-delivery"
                        value="type-delivery"
                        checked={stepActive === 'type-delivery'}
                    />
                    <label
                        htmlFor="type-delivery"
                        className={`steps__row_step ${
                            isCompleteStep.paymentInfo && 'step__complete'
                        }`}
                    >
                        <div className="circle">3</div>
                        <div className="dotted__row">
                            <span className="dotted"></span>
                            <span className="dotted"></span>
                            <span className="dotted"></span>
                            <span className="dotted"></span>
                        </div>
                    </label>
                </div>
                {stepActive === 'personal-data' && (
                    <motion.h2
                        key="Personal details"
                        className="order-info__title"
                        initial="titleHidden"
                        animate="titleVisible"
                        variants={stepAnimation}
                    >
                        Personal details
                    </motion.h2>
                )}
                {stepActive === 'address-data' && (
                    <motion.h2
                        key="Delivery address"
                        className="order-info__title"
                        initial="titleHidden"
                        animate="titleVisible"
                        variants={stepAnimation}
                    >
                        Delivery address
                    </motion.h2>
                )}
                {stepActive === 'type-delivery' && (
                    <motion.h2
                        key="Choose payment type"
                        className="order-info__title"
                        initial="titleHidden"
                        animate="titleVisible"
                        variants={stepAnimation}
                    >
                        Choose payment type
                    </motion.h2>
                )}
                <motion.form
                    className="order-info__row"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ amount: 0.2 }}
                >
                    {stepActive === 'personal-data' && (
                        <motion.div
                            key="delivery__info_personal"
                            className="delivery__info_personal"
                            initial="hidden"
                            animate="visible"
                            variants={stepAnimation}
                        >
                            <Input
                                elementType="login"
                                elementName="name"
                                valueElement={delivery.name}
                                onChangeFunction={setDelivery}
                                userData={delivery}
                                icon={<UserIcon />}
                            />
                            <Input
                                elementType="email"
                                elementName="email"
                                onChangeFunction={setDelivery}
                                valueElement={delivery.email}
                                userData={delivery}
                                icon={<EmailIcon />}
                            />
                            <Input
                                elementType="tel"
                                elementName="phone"
                                valueElement={delivery.phone}
                                onChangeFunction={setDelivery}
                                userData={delivery}
                                icon={<PhoneIcon />}
                            />
                        </motion.div>
                    )}
                    {stepActive === 'address-data' && (
                        <motion.div
                            key="delivery__info_address"
                            className="delivery__info_address"
                            initial="hidden"
                            animate="visible"
                            variants={stepAnimation}
                        >
                            <Input
                                elementType="text"
                                elementName="city"
                                valueElement={delivery.city}
                                onChangeFunction={setDelivery}
                                userData={delivery}
                                icon={<MapIcon />}
                            />
                            <div className="input-address__inner">
                                <Input
                                    elementType="text"
                                    elementName="street"
                                    valueElement={delivery.street}
                                    onChangeFunction={setDelivery}
                                    userData={delivery}
                                    icon={<StreetIcon />}
                                />
                                <Input
                                    elementType="text"
                                    elementName="house"
                                    valueElement={delivery.house}
                                    onChangeFunction={setDelivery}
                                    userData={delivery}
                                    icon={<HouseIcon />}
                                />
                            </div>
                            <div className="input-address__inner">
                                <Input
                                    elementType="number"
                                    elementName="level"
                                    valueElement={delivery.level}
                                    onChangeFunction={setDelivery}
                                    userData={delivery}
                                    icon={<LevelIcon />}
                                />
                                <Input
                                    elementType="text"
                                    elementName="apartment"
                                    valueElement={delivery.apartment}
                                    onChangeFunction={setDelivery}
                                    userData={delivery}
                                    icon={<ApartmentIcon />}
                                />
                            </div>
                        </motion.div>
                    )}
                    {stepActive === 'type-delivery' && (
                        <motion.div
                            key="delivery__info_buttons delivery__buttons"
                            className="delivery__info_buttons delivery__buttons"
                            initial="hidden"
                            animate="visible"
                            variants={stepAnimation}
                        >
                            <div className="delivery__buttons_inner">
                                <input
                                    onChange={handlePaymentType}
                                    className="delivery__buttons_inner-card"
                                    type="radio"
                                    value="card"
                                    id="card"
                                    name="payment"
                                    checked={delivery.payment === 'card'}
                                />
                                <label htmlFor="card">
                                    <CardIcon className="delivery__icon" />
                                    Card
                                </label>
                            </div>
                            <div className="delivery__buttons_inner">
                                <input
                                    onChange={handlePaymentType}
                                    className="delivery__buttons_inner-cash"
                                    type="radio"
                                    value="cash"
                                    id="cash"
                                    name="payment"
                                    checked={delivery.payment === 'cash'}
                                />
                                <label htmlFor="cash">
                                    Cash
                                    <WalletIcon className="delivery__icon" />
                                </label>
                            </div>
                        </motion.div>
                    )}
                    {isCompleteStep.deliveryInfo &&
                    isCompleteStep.personal &&
                    stepActive === 'type-delivery' ? (
                        <input
                            type="button"
                            value="Send Form"
                            className="restaurants__button"
                            onClick={handleSubmit}
                            disabled={!isCompleteStep.paymentInfo}
                        />
                    ) : (
                        <input
                            type="button"
                            value="Next Step"
                            className="restaurants__button"
                            onClick={changeStepOrder}
                            disabled={
                                (!isCompleteStep.personal &&
                                    stepActive === 'personal-data') ||
                                (!isCompleteStep.deliveryInfo &&
                                    stepActive === 'address-data') ||
                                (!isCompleteStep.paymentInfo &&
                                    stepActive === 'type-delivery')
                            }
                        />
                    )}
                </motion.form>
            </div>
        </section>
    );
};

export default Order;
