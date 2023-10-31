import React from 'react';

const ModalAuth = () => {
    return (
        <div className='modal__auth'>
            <form>
                <div>
                    <input type="text"  id='modal__auth_login' placeholder='Enter you login'required/>
                </div>
                <div>
                    <input type="email" id='modal__auth_email' placeholder='Enter you password' required/>
                </div>
                <button>
                    enter
                </button>
            </form>
            <div className='modal__auth_rect'></div>
        </div>
    );
};

export default ModalAuth;