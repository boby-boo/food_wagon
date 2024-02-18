import { motion } from 'framer-motion';
import { Input } from '../index';
import { orderAnimationSettings } from '../utils';
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

const Order = props => {
    const {
        delivery,
        setDelivery,
        handleSubmit,
        handlePaymentType,
        changeStepOrder,
        isCompleteStep,
        stepActive,
    } = props;
    return (
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
                    variants={orderAnimationSettings}
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
                    variants={orderAnimationSettings}
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
                    variants={orderAnimationSettings}
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
    );
};

export default Order;
