const OrderStep = props => {
    const {
        changeStepOrder,
        name,
        id,
        value,
        isChecked,
        isCompleted,
        step,
        cls,
    } = props;

    return (
        <>
            <input
                onChange={changeStepOrder}
                type="radio"
                name={name}
                className={cls}
                id={id}
                value={value}
                checked={isChecked}
            />
            <label htmlFor={id} className={`steps__row_step ${isCompleted}`}>
                <div className="circle">{step}</div>
                <div className="dotted__row">
                    <span className="dotted"></span>
                    <span className="dotted"></span>
                    <span className="dotted"></span>
                    <span className="dotted"></span>
                </div>
            </label>
        </>
    );
};

export default OrderStep;
