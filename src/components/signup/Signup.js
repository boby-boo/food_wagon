import React, { useState, useRef } from "react";
import Input from "../input/Input";
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";
import { userLogin } from "../../reducers/userSlice";
import FoodWagonService from "../../services/FoodWagonService";
import "./signup.scss";

const Signup = () => {
    const [userData, setUserData] = useState("");
    const { postUser } = FoodWagonService();
    const dispatch = useDispatch();

    const handleChange = (e) => {
        const value = e.target.value,
            target = e.target.id;

        setUserData({
            ...userData,
            [target]: value,
        });
    };

    const onsubmitForm = (e) => {
        e.preventDefault();

        const user = {
            id: uuidv4(),
            ...userData,
        };

        postUser(JSON.stringify(user));
        dispatch(userLogin(user));

        setUserData({});
    };

    return (
        <section className="signup">
            <div className="container">
                <form onSubmit={onsubmitForm} className="signup__form">
                    <h1>PERSONAL DETAILS</h1>
                    <Input
                        elementType="login"
                        valueElement={userData.login}
                        handleChange={handleChange}
                        userData={userData}
                        icon={
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="16"
                                width="14"
                                viewBox="0 0 448 512"
                                fill="#9E9E9E"
                            >
                                <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
                            </svg>
                        }
                    />

                    <Input
                        elementType="email"
                        valueElement={userData.email}
                        handleChange={handleChange}
                        userData={userData}
                        icon={
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="16"
                                width="16"
                                viewBox="0 0 512 512"
                                fill="#9E9E9E"
                            >
                                <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z" />
                            </svg>
                        }
                    />

                    <Input
                        elementType="password"
                        valueElement={userData.password}
                        handleChange={handleChange}
                        userData={userData}
                        icon={
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="16"
                                width="14"
                                viewBox="0 0 448 512"
                                fill="#9E9E9E"
                            >
                                <path d="M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80z" />
                            </svg>
                        }
                    />
                    <button className="restaurants__button primary__button">
                        REGISTER
                    </button>
                </form>
            </div>
        </section>
    );
};

export default Signup;
