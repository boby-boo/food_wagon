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

export const addToBasket = (item) => {
    const { id, name,  price, image, weight} = item;

    const updateData = {
        id,
        name, 
        price,
        quantity: 1,
        image,
        weight
    }

    return {
        type: 'ADD_TO_BASKET',
        payload: updateData
    }
}

export const removeToBasket = (item) => {

    return {
        type: 'REMOVE_TO_BASKET',
        payload: item
    }
}