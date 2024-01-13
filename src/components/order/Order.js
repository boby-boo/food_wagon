import React, { useEffect, useState } from 'react';
import Input from '../input/Input';
import { ReactComponent as UserIcon } from '../../resources/icons/user__icon.svg';
import { ReactComponent as PhoneIcon } from '../../resources/icons/phone__icon.svg';
import { ReactComponent as MapIcon } from '../../resources/icons/map__icon.svg';
import { ReactComponent as StreetIcon } from '../../resources/icons/street__icon.svg';
import { ReactComponent as HouseIcon } from '../../resources/icons/house__icon.svg';
import { ReactComponent as LevelIcon } from '../../resources/icons/level__icon.svg';
import { ReactComponent as ApartmentIcon } from '../../resources/icons/apartment__icon.svg';
import { ReactComponent as CardIcon } from '../../resources/icons/credit-card__icon.svg';
import { ReactComponent as WalletIcon } from '../../resources/icons/wallet__icon.svg';

import './order.scss';

const Order = () => {
    const [delivery, setDelivery] = useState({
        name: 's',
        email: '12ed@gmail.com',
        phone: '',
        city: 'ds',
        street: '1',
        house: '2',
        level: '1',
        apartment: '1',
        payment: '',
    });
    const [stepActive, setStepActive] = useState(null);
    const [isCompleteStep, setIsCompleteStep] = useState({
        personal: false,
        deliveryInfo: false,
        paymentInfo: false,
    });

    const steps = ['personal-data', 'address-data', 'type-delivery'];

    useEffect(() => {
        setStepActive(steps[0]);
    }, []);

    useEffect(() => {
        checkComplete();
    }, [delivery]);

    const handleChange = e => {
        const { name, value, type } = e.target;

        if (type === 'tel') {
            const updValue = value.replace(/[^0-9]/g, ' ').trim();
            // /^\d+$/.test(value)) ? console.log('true') : console.log('false');
            setDelivery({
                ...delivery,
                [name]: updValue,
            });

            return;
        }
        setDelivery({
            ...delivery,
            [name]: value,
        });
    };

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
            } else {
                return;
            }
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
        console.log('submit');
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

        const personal = name !== '' && email !== '' && phone !== '';
        const deliveryInfo =
            city !== '' &&
            street !== '' &&
            house !== '' &&
            level !== '' &&
            apartment !== '';

        const paymentInfo = payment !== '';

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
                <form className="order-info__row">
                    {stepActive === 'personal-data' && (
                        <div className="delivery__info_personal">
                            <Input
                                elementType="login"
                                elementName="name"
                                valueElement={delivery.name}
                                handleChange={handleChange}
                                userData={delivery}
                                icon={<UserIcon />}
                            />
                            <Input
                                elementType="tel"
                                elementName="phone"
                                valueElement={delivery.phone}
                                handleChange={handleChange}
                                userData={delivery}
                                icon={<PhoneIcon />}
                            />
                        </div>
                    )}
                    {stepActive === 'address-data' && (
                        <div className="delivery__info_address">
                            <Input
                                elementType="text"
                                elementName="city"
                                valueElement={delivery.city}
                                handleChange={handleChange}
                                userData={delivery}
                                icon={<MapIcon />}
                            />
                            <div className="input-address__inner">
                                <Input
                                    elementType="text"
                                    elementName="street"
                                    valueElement={delivery.street}
                                    handleChange={handleChange}
                                    userData={delivery}
                                    icon={<StreetIcon />}
                                />
                                <Input
                                    elementType="text"
                                    elementName="house"
                                    valueElement={delivery.house}
                                    handleChange={handleChange}
                                    userData={delivery}
                                    icon={<HouseIcon />}
                                />
                            </div>
                            <div className="input-address__inner">
                                <Input
                                    elementType="number"
                                    elementName="level"
                                    valueElement={delivery.level}
                                    handleChange={handleChange}
                                    userData={delivery}
                                    icon={<LevelIcon />}
                                />
                                <Input
                                    elementType="text"
                                    elementName="apartment"
                                    valueElement={delivery.apartment}
                                    handleChange={handleChange}
                                    userData={delivery}
                                    icon={<ApartmentIcon />}
                                />
                            </div>
                        </div>
                    )}
                    {stepActive === 'type-delivery' && (
                        <div className="delivery__buttons">
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
                        </div>
                    )}
                    {isCompleteStep.deliveryInfo &&
                    isCompleteStep.personal &&
                    isCompleteStep.paymentInfo ? (
                        <input
                            type="button"
                            value="Send Form"
                            className="restaurants__button"
                            onClick={handleSubmit}
                        />
                    ) : (
                        <input
                            type="button"
                            value="Next Step"
                            className="restaurants__button"
                            onClick={changeStepOrder}
                        />
                    )}
                </form>
            </div>
        </section>
    );
};

export default Order;
