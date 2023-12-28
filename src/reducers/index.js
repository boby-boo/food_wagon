const initialStore = {
    login: JSON.parse(localStorage.getItem('user')) || {},
    cart: JSON.parse(localStorage.getItem('cart')) || [],
    filteredProducts: null,
    searchState: {
        currentValue: '',
        isEmpty: false
    },
    dataCards: []
}

const reducer = (state = initialStore, action) => {
    switch (action.type) {
        case 'USER_LOGIN':
            return {
                ...state,
                login: action.payload
            };
        case 'USER_LOGOUT':
            return {
                ...state,
                login: action.payload
            };
        case 'ADD_TO_CART':
            const checkIndex = state.cart.find(item => item.id === action.payload.id);

            if (checkIndex) {
                const updateBasket = state.cart.map(item => item.id === action.payload.id ? { ...item, quantity: item.quantity +1} : item);

                localStorage.setItem('cart', JSON.stringify(updateBasket))

                return {
                    ...state,
                    cart: updateBasket
                }
            }

            localStorage.setItem('cart', JSON.stringify([...state.cart, action.payload]))

            return {
                ...state,
                cart: [...state.cart, action.payload]
            };
        case 'REMOVE_FROM_CART':
            const checkIndex1 = state.cart.find(item => item.id === action.payload.id);
            
            if (checkIndex1) {
                const updateBasket = state.cart.map(item => item.id === action.payload.id ? { ...item, quantity: item.quantity -1} : item);
                const filteredBasket = updateBasket.filter(item => item.quantity > 0);

                localStorage.setItem('cart', JSON.stringify(filteredBasket));

                return {
                    ...state,
                    cart: filteredBasket
                }
            };

            localStorage.setItem('cart', JSON.stringify([...state.cart]));

        return {
            ...state,
            cart: [...state.cart]
        };
        case 'REMOVE_ITEM':

            localStorage.setItem('cart', JSON.stringify(state.cart.filter(item => item.id !== action.payload.id)));
            
            return {
                ...state,
                cart: state.cart.filter(item => item.id !== action.payload.id)
            };
        case 'UPDATE_DATA_CARDS': 
            return {
                ...state,
                dataCards: [...action.payload]
            }
        case 'FILTERED_PRODUCTS_DATA':
            return {
                ...state,
                filteredProducts: action.payload ? [...action.payload] : null
            }
        case 'SEARCHED_STATE':
            const { currentValue, isEmpty } = action.payload;
            return {
                ...state,
                searchState: {
                    currentValue,
                    isEmpty
                }
            }
            default: return state;
    }
}

export default reducer;