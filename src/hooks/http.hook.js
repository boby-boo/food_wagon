export const useHttp = () => {

    const request = async(url) => {
        try {
            const res = await fetch(url);
            
            if (!res.ok) {
                throw new Error(`Could not fetch ${res.status}`);
            }

            const data = await res.json();
            return data;
        } catch (error) {
            console.error('Error: ', error)
        }
    }

    return {request};
}