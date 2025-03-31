import { useEffect, useState } from 'react';

const getStorageValue = <T>(key: string, defaultValue: T) => {
    const saved = localStorage.getItem(key);
    const initial = saved ? JSON.parse(saved) : null;
    return initial ?? defaultValue;
};

export const useLocalStorage = <T>(key: string, defaultValue: T) => {
    const [ value, setValue ] = useState<T>(() => getStorageValue(key, defaultValue));

    useEffect(() => {
        const keys = [ 'username', 'name', 'token', 'userId' ];

        // Revisa si alguno de los valores clave falta en localStorage
        const anyMissing = keys.some(k => localStorage.getItem(k) === null);

        if (anyMissing) {
            // Si falta uno, borra todos y actualiza el estado a null
            keys.forEach(k => localStorage.removeItem(k));
            setValue(null as T);
        } else {
            // Si todos están presentes, guarda el valor normalmente
            localStorage.setItem(key, JSON.stringify(value));
        }
    }, [ key, value ]);

    return [ value, setValue ] as const;
};