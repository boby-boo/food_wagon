import { useNavigate } from 'react-router-dom';

const BackButton = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(-1);
    };

    return (
        <button type="button" onClick={handleClick} className="back-btn">
            <div className="back-btn__back"></div>
            <span>Back</span>
        </button>
    );
};

export default BackButton;
