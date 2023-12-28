export const userLogin = (user) => {
    return {
        type: 'USER_LOGIN',
        payload: user
    }
}

export const userLogout = (user) => {
    return {
        type: 'USER_LOGOUT',
        payload: user
    }
}

export const addToCart = (item) => {
    const { id, name,  price, image, weight } = item;

    const updateData = {
        id,
        name, 
        price,
        quantity: 1,
        image,
        weight
    }

    return {
        type: 'ADD_TO_CART',
        payload: updateData
    }
}

export const removeFromCart = (item) => {
    return {
        type: 'REMOVE_FROM_CART',
        payload: item
    }
}

export const removeItem = (item) => {
    return {
        type: 'REMOVE_ITEM',
        payload: item
    }
}

export const updateDataCards = (data) => {
    return {
        type: 'UPDATE_DATA_CARDS',
        payload: data
    }
}

export const filteredProductsData = (filteredData) => {
    return {
        type:'FILTERED_PRODUCTS_DATA',
        payload: filteredData
    }
}
export const searchingState = (currentValue, isEmpty) => {
    return {
        type:'SEARCHED_STATE',
        payload: {
            currentValue,
            isEmpty
        }
    }
}
