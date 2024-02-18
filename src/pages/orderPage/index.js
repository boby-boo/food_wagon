import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { motion } from 'framer-motion';
import { Order, OrderStep } from '../../components';
import { removeAllItem } from '../../reducers/cartSlice';
import { dataOfCart } from '../../reducers/selectors';
import { orderAnimationSettings } from '../../components/utils';
import useFoodWagonService from '../../services/FoodWagonService';
import { DeliveryIcon } from '../../components/icons';

const OrderPage = () => {
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
    const [isSubmit, setIsSubmit] = useState(false);

    const steps = ['personal-data', 'address-data', 'type-delivery'];

    const { postOrder } = useFoodWagonService();

    const navigate = useNavigate();
    const cartData = useSelector(dataOfCart);
    const dispatch = useDispatch();

    useEffect(() => {
        setStepActive(steps[0]);
    }, []);

    useEffect(() => {
        let timerId;

        if (isSubmit) {
            timerId = setTimeout(() => {
                setIsSubmit(false);
                navigate('/');
            }, 4000);
        }

        return () => clearInterval(timerId);
    }, [isSubmit]);

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

        const totalPrice = cartData
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
            order: [...cartData],
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

        setIsSubmit(true);
        dispatch(removeAllItem());
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

    if (isSubmit) {
        return (
            <motion.div
                className="notification-order"
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
            >
                <h2>
                    <span>Your order</span> is accepted
                </h2>
                <p>We will call you when the order will done</p>
                <DeliveryIcon />
            </motion.div>
        );
    }

    return (
        <section className="order-info">
            <div className="container">
                <div className="steps__row">
                    <OrderStep
                        changeStepOrder={changeStepOrder}
                        name="step"
                        id="personal-data"
                        value="personal-data"
                        cls="step__input_personal"
                        isChecked={stepActive === 'personal-data'}
                        isCompleted={
                            isCompleteStep.personal && 'step__complete'
                        }
                        step="1"
                    />
                    <OrderStep
                        changeStepOrder={changeStepOrder}
                        name="step"
                        id="address-data"
                        value="address-data"
                        cls="step__input_address"
                        isChecked={stepActive === 'address-data'}
                        isCompleted={
                            isCompleteStep.deliveryInfo && 'step__complete'
                        }
                        step="2"
                    />
                    <OrderStep
                        changeStepOrder={changeStepOrder}
                        name="step"
                        id="type-delivery"
                        value="type-delivery"
                        cls="step__input_delivery"
                        isChecked={stepActive === 'type-delivery'}
                        isCompleted={
                            isCompleteStep.paymentInfo && 'step__complete'
                        }
                        step="3"
                    />
                </div>
                {stepActive === 'personal-data' && (
                    <motion.h2
                        key="Personal details"
                        className="order-info__title"
                        initial="titleHidden"
                        animate="titleVisible"
                        variants={orderAnimationSettings}
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
                        variants={orderAnimationSettings}
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
                        variants={orderAnimationSettings}
                    >
                        Choose payment type
                    </motion.h2>
                )}
                <Order
                    delivery={delivery}
                    setDelivery={setDelivery}
                    handleSubmit={handleSubmit}
                    handlePaymentType={handlePaymentType}
                    changeStepOrder={changeStepOrder}
                    isCompleteStep={isCompleteStep}
                    stepActive={stepActive}
                />
            </div>
        </section>
    );
};

export default OrderPage;
