import { useHttp } from '../hooks/http.hook';

const useFoodWagonService = () => {
    const _baseOffset = 4;
    const { request } = useHttp();

    const getAllRestaurant = async (offset = _baseOffset) => {
        const res = await request(`http://localhost:3001/partners?_limit=${offset}`);
        return res;
    }

    const getPopularProducts = async(start = 3, end = 7) => {
        const res = await request(`http://localhost:3001/restaurant?_start=${start}&_end=${end}`);
        return res;
    }

    const getAllProducts = async(url = 'http://localhost:3001/restaurant') => {
        const res = await request(url)
                            .then(res => res.map(item => item.data).flat(Infinity));
        return res
    }

    const getRestaurant = async(restaurant) => {
        const res = await request(`http://localhost:3001/restaurant?products=${restaurant}`)
                            .then(res => res[0]);
        return res;
    }


    return { getAllRestaurant, getPopularProducts, getAllProducts, getRestaurant }
}
export default useFoodWagonService;