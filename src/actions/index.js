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