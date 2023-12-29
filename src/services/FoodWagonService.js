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

    const getPopularProducts = async(start = 3, end = 7) => {
        const res = await request(`${_baseURL}restaurant?_start=${start}&_end=${end}`);
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


    return { getAllRestaurant, getPopularProducts, getAllProducts, getRestaurant }
}
export default useFoodWagonService;