import React from 'react';

import './signup.scss';

const Signup = () => {
    return (
        <section className='signup'>
            <div className="container">
                <form >
                    <h1>PERSONAL DETAILS</h1>
                    <input className='input__inner' type="text" />
                </form>
            </div>
        </section>
    );
};

export default Signup;