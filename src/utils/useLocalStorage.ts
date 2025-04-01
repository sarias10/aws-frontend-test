import { useEffect, useState } from 'react';

const getStorageValue = <T>(key: string, defaultValue: T) => {
    const saved = localStorage.getItem(key);

    // Si el valor es null o "undefined", devolver el defaultValue
    if (saved === null || saved === 'undefined') return defaultValue;

    try {
        return JSON.parse(saved);
    } catch (error) {
        console.error(`Error parsing localStorage key "${key}":`, error);
        return defaultValue;
    }
};

export const useLocalStorage = <T>(key: string, defaultValue: T) => {
    const [ value, setValue ] = useState<T>(() => getStorageValue(key, defaultValue));

    const sessionKeys = [ 'username', 'name', 'token', 'userId' ];
    // Función para revocar sesión (borrar datos y actualizar el estado)
    const revokeSession = () => {
        console.warn('Revoking session due to missing or null values.');
        sessionKeys.forEach(k => localStorage.removeItem(k));
        setValue(null as T);
    };

    useEffect(() => {

        // Verifica si algún valor clave falta o es "null"
        const anyMissingOrNull = sessionKeys.some(k => {
            const stored = localStorage.getItem(k);
            return stored === null || stored === 'null';
        });

        if (anyMissingOrNull || value === null) {
            revokeSession();
        } else {
            localStorage.setItem(key, JSON.stringify(value));
        }
    }, [ key, value ]);

    return [ value, setValue ] as const;
};