import { useHttp } from '../hooks/http.hook';

const useFoodWagonService = () => {
    const _baseOffsetRestaurant = 4;
    const _baseOffsetProducts = 12;
    const _baseURL = 'http://localhost:3001/';
    const { request } = useHttp();

    const getAllRestaurant = async (offset = _baseOffsetRestaurant, url = `${_baseURL}restaurant?`) => {
        const res = await request(`${url}_limit=${offset}`);
        return res;
    }

    const getPopularProducts = async() => {
        const res = await request(`${_baseURL}restaurant?`)
        return res;
    }

    const getCategoryRestaurant = async() => {
        const res = await request(`${_baseURL}restaurant?`)
                            .then(res => {
                                return Array.from(new Set(res.map(partner => partner.category)))
                                        .map(kitchen => res.find(partner => partner.category === kitchen));
                            })
        return res;
    }

    const getAllProducts = async(category = '', value = '', limit = _baseOffsetProducts, url = `${_baseURL}allProducts?`) => {
        const res = await request(`${url}${category === 'all' ? null : `category=${category}`}&name_like=${value}&_limit=${limit}`)
                            .then(res => res);
        return res
    }

    const getRestaurant = async(restaurant = '', url = `${_baseURL}restaurant?`) => {
        const res = await request(`${url}products=${restaurant}`)
                            .then(res => res[0]);
        return res;
    }


    return { getAllRestaurant, getPopularProducts, getAllProducts, getRestaurant, getCategoryRestaurant }
}
export default useFoodWagonService;