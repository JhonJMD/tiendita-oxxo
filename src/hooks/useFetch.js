import { useState, useEffect, useCallback } from 'react';

export const useFetch = (initialUrl = null, initialOptions = {}) => {
    const [url, setUrl] = useState(initialUrl);
    const [options, setOptions] = useState(initialOptions);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = useCallback(async (fetchUrl = url, fetchOptions = options) => {
        if (!fetchUrl) return;

        try {
            setLoading(true);
            setError(null);

            const response = await fetch(fetchUrl, fetchOptions);

            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }

            const result = await response.json();
            setData(result);
            return result;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    }, [url, options]);

    useEffect(() => {
        if (url) {
            fetchData();
        }
    }, [url, fetchData]);

    return {
        data,
        loading,
        error,
        fetchData,
        setUrl,
        setOptions,
    };
};