import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { AnimatePresence } from 'framer-motion';
import { searchedState } from '../../reducers/searchStateSlice';
import { dataOfCart, dataOfUser } from '../../reducers/selectors';
import { LogoIcon } from '../icons';
import { ModalAuth, UserPopup } from '../index';

const Header = () => {
    const [value, setValue] = useState('');
    const [isOpenModalWindow, setIsOpenModalWindow] = useState(false);

    let currentLogin;

    const userData = useSelector(dataOfUser);
    const cartData = useSelector(dataOfCart);
    const location = useLocation();

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const toggleModalOpen = () => {
        setIsOpenModalWindow(!isOpenModalWindow);
    };

    const handleClick = () => {
        setValue('');
        const data = {
            currentValue: '',
            isEmpty: true,
        };
        dispatch(searchedState(data));
    };

    const handleChange = e => {
        const currentValue = e.target.value;

        if (currentValue === '') {
            setValue('');
            const data = {
                valueTarget: '',
                isEmpty: true,
            };
            dispatch(searchedState(data));
            return;
        }

        setValue(currentValue);

        const data = {
            currentValue,
            isEmpty: false,
        };

        dispatch(searchedState(data));
    };

    const handleNavigate = () => {
        if (location.pathname.search(/search/) === -1) navigate('/search/all');
    };

    const calcScroll = () => {
        const div = document.createElement('div');

        div.style.width = '50px';
        div.style.height = '50px';
        div.style.overflowY = 'scroll';
        div.style.visibility = 'hidden';

        document.body.appendChild(div);
        const scrollWidth = div.offsetWidth - div.clientWidth;
        div.remove();

        return scrollWidth;
    };

    const scrollWidth = calcScroll();

    if (isOpenModalWindow) {
        document.body.style.overflow = 'hidden';
        document.body.style.marginRight = `${scrollWidth}px`;
    } else {
        setTimeout(() => {
            document.body.style.overflow = 'visible';
            document.body.style.marginRight = '0px';
        }, 190);
    }

    const border = {
        borderRadius: '10px 0 0 10px',
    };

    if (userData?.name) {
        const { name } = userData;
        currentLogin = name.length > 10 ? `${name.substring(0, 6)} ...` : name;
    }

    return (
        <>
            <header className="header">
                <div className="container">
                    <nav>
                        <ul className="header__row">
                            <li className="header__row_logo">
                                <Link to="/">
                                    <img src={LogoIcon} alt="foodwagon logo" />
                                    <div>
                                        food<span>wagon</span>
                                    </div>
                                </Link>
                            </li>
                            <li className="header__row_search-panel">
                                <input
                                    type="text"
                                    onChange={handleChange}
                                    style={value ? border : null}
                                    onFocus={handleNavigate}
                                    value={value}
                                    id="search__panel"
                                    placeholder="Search Food"
                                />
                                {value && (
                                    <button
                                        type="button"
                                        onClick={handleClick}
                                    ></button>
                                )}
                            </li>
                            <li className="header__row_user-panel user-panel">
                                <Link to="/cart" className="user-panel__basket">
                                    <span>{cartData.length}</span>
                                </Link>
                                <button
                                    type="button"
                                    onClick={toggleModalOpen}
                                    className="user-panel__login"
                                >
                                    <span>{currentLogin || 'Name'}</span>
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>
            <AnimatePresence>
                {isOpenModalWindow &&
                    (!userData.name ? (
                        <ModalAuth toggleModalOpen={toggleModalOpen} />
                    ) : (
                        <UserPopup toggleModalOpen={toggleModalOpen} />
                    ))}
            </AnimatePresence>
        </>
    );
};

export default Header;
