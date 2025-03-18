import { createContext, PropsWithChildren } from 'react';
import { AuthProviderProps, LoginType, SignupType } from '../types/types';
import publicServices from '../services/public';
import { useLocalStorage } from '../utils/useLocalStorage';

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthProviderProps | null>(null);

export const AuthContextProvider = ({ children }: PropsWithChildren<object>) => {
    const [ username, setUsername ] = useLocalStorage<string|null>('username',null);
    const [ name, setName ] = useLocalStorage<string | null>('name',null);
    const [ token, setToken ] = useLocalStorage<string | null>('token',null);

    const signup = async (data: SignupType) => {
        await publicServices.signUp(data);
    };

    const login = async (data:LoginType) => {
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
    };

    const logout = () => {
        setUsername(null);
        setName(null);
        setToken(null);
    };
    return (
        <AuthContext.Provider value={{ username, name, token, signup, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
