import nodeFetch from 'node-fetch';

export default function (url, { credentials, ...options } = {}) {
    return nodeFetch(url, {
        credentials: 'include',
        ...options,
        headers: {
            ...options.headers,
        },
    });
}