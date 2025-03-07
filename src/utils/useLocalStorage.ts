import { useEffect, useState } from 'react';

const getStorageValue = <T>(key: string, defaultValue: T) => {
    const saved = localStorage.getItem(key);
    const initial = saved ? JSON.parse(saved) : null;
    return initial || defaultValue;
};

export const useLocalStorage = <T>(key: string, defaultValue: T) => {
    const [ value, setValue ] = useState<T>(() => {
        return getStorageValue(key, defaultValue);
    });

    useEffect(() => {
        // Storing input name
        localStorage.setItem(key, JSON.stringify(value));
    }, [ key, value ]);

    return [ value, setValue ] as const;
};