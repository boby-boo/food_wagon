const initialStore = {
    login: JSON.parse(localStorage.getItem('user')) || {},
    basket: []
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
        case 'ADD_TO_BASKET':
            const checkIndex = state.basket.find(item => item.id === action.payload.id);

            if (checkIndex) {
                const updateBasket = state.basket.map(item => item.id === action.payload.id ? { ...item, quantity: item.quantity +1} : item);
                return {
                    ...state,
                    basket: updateBasket
                }
            }

            return {
                ...state,
                basket: [...state.basket, action.payload]
            };
        case 'REMOVE_TO_BASKET':
            const checkIndex1 = state.basket.find(item => item.id === action.payload.id);

            if (checkIndex1) {
                const updateBasket = state.basket.map(item => item.id === action.payload.id ? { ...item, quantity: item.quantity -1} : item);
                const filteredBasket = updateBasket.filter(item => item.quantity > 0);
                return {
                    ...state,
                    basket: filteredBasket
                }
            }

        return {
            ...state,
            basket: [...state.basket]
        };
        
            default: return state;
    }
}

export default reducer;