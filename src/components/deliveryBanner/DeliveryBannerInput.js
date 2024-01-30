const DeliveryBannerInput = ({
    onchangeFn,
    name,
    id,
    nameClass,
    value,
    icon,
    text,
    labelClass,
    isChecked,
}) => {
    return (
        <div className="input__wrapper">
            <input
                onChange={onchangeFn}
                type="radio"
                className={`form__top_input${nameClass}`}
                id={id}
                name={name}
                value={value}
                defaultChecked={isChecked}
            />
            <label className={`form__top_input ${labelClass}`} htmlFor={id}>
                {icon}
                {text}
            </label>
        </div>
    );
};

export default DeliveryBannerInput;
