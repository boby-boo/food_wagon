import { useCallback } from 'react';

export const useHttp = () => {
    const request = useCallback(
        async (
            url,
            method = 'GET',
            body = null,
            headers = { 'Content-Type': 'application/json' },
        ) => {
            try {
                const res = await fetch(url, { method, body, headers });

                if (!res.ok) {
                    throw new Error(`Could not fetch ${res.status}`);
                }

                const data = await res.json();

                return data;
            } catch (error) {
                // eslint-disable-next-line no-console
                console.error('Error: ', error);
                return error;
            }
        },
        [],
    );

    return { request };
};
