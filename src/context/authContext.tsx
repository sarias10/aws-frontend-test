import { createContext, PropsWithChildren } from 'react';
import { AuthProviderProps, LoginType } from '../types/types';
import publicServices from '../services/public';
import { useLocalStorage } from '../utils/useLocalStorage';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthProviderProps | null>(null);

export const AuthContextProvider = ({ children }: PropsWithChildren<object>) => {
    const [ username, setUsername ] = useLocalStorage<string|null>('username',null);
    const [ name, setName ] = useLocalStorage<string | null>('name',null);
    const [ token, setToken ] = useLocalStorage<string | null>('token',null);

    const login = async (data:LoginType) => {
        try{
            const response = await publicServices.login(data);
            const usernameResponse = response.data.username;
            const nameResponse = response.data.name;
            const tokenResponse = response.data.token;
            setUsername(usernameResponse);
            setName(nameResponse);
            setToken(tokenResponse);
            window.localStorage.setItem('username', JSON.stringify(response.data.username));
            window.localStorage.setItem('name', JSON.stringify(response.data.name));
            window.localStorage.setItem('token', JSON.stringify(response.data.token));
            toast.success('Log in successfully!');
        } catch(error){
            if (error instanceof AxiosError && error.response?.data?.message) {
                toast.error(error.response.data.message || 'An unexpected error occurred.');
            } else {
                toast.error('An unexpected error occurred.');
            }
        }

    };

    const logout = () => {
        setUsername(null);
        setName(null);
        setToken(null);
    };
    return (
        <AuthContext.Provider value={{ username, name, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
