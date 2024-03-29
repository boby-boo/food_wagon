import { Input } from '../index';
import { UserIcon, EmailIcon, PasswordIcon, PhoneIcon } from '../icons';

const SignupForm = ({ userData, setUserData, isValid, onsubmitForm }) => {
    return (
        <>
            <form onSubmit={onsubmitForm} className="signup__form">
                <h1>PERSONAL DETAILS</h1>
                <Input
                    elementType="login"
                    elementName="name"
                    valueElement={userData.name}
                    onChangeFunction={setUserData}
                    userData={userData}
                    icon={<UserIcon />}
                />
                <Input
                    elementType="email"
                    elementName="email"
                    valueElement={userData.email}
                    onChangeFunction={setUserData}
                    userData={userData}
                    icon={<EmailIcon />}
                />
                <Input
                    elementType="password"
                    elementName="password"
                    valueElement={userData.password}
                    onChangeFunction={setUserData}
                    userData={userData}
                    icon={<PasswordIcon />}
                />
                <Input
                    elementType="tel"
                    elementName="phone"
                    valueElement={userData.phone}
                    onChangeFunction={setUserData}
                    userData={userData}
                    icon={<PhoneIcon />}
                />
                <button
                    type="submit"
                    disabled={isValid}
                    className="restaurants__button primary__button"
                >
                    REGISTER
                </button>
            </form>
        </>
    );
};

export default SignupForm;
