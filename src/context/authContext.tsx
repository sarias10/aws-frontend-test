import { createContext, ReactNode, useContext } from 'react';
import { LoginType, SignupType } from '../types/types';
import publicServices from '../services/public';
import { useLocalStorage } from '../utils/useLocalStorage';

export interface AuthProviderProps {
    username: string | null,
    name: string | null,
    token: string | null,
    userId: number | null,
    signup (data: SignupType): Promise<void>,
    login (data: LoginType): Promise<void>,
    logout(): void,
};

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthProviderProps | null>(null);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
    const [ username, setUsername ] = useLocalStorage<string|null>('username',null);
    const [ name, setName ] = useLocalStorage<string | null>('name',null);
    const [ token, setToken ] = useLocalStorage<string | null>('token',null);
    const [ userId, setUserId ] = useLocalStorage<number | null>('userId', null);

    const signup = async (data: SignupType) => {
        await publicServices.signUp(data);
    };

    const login = async (data:LoginType) => {
        const response = await publicServices.login(data);
        const usernameResponse = response.data.username;
        const nameResponse = response.data.name;
        const tokenResponse = response.data.token;
        const userIdResponse = response.data.id;
        setUsername(usernameResponse);
        setName(nameResponse);
        setToken(tokenResponse);
        setUserId(userIdResponse);
        window.localStorage.setItem('username', JSON.stringify(response.data.username));
        window.localStorage.setItem('name', JSON.stringify(response.data.name));
        window.localStorage.setItem('token', JSON.stringify(response.data.token));
        window.localStorage.setItem('userId', JSON.stringify(response.data.userId));
    };

    const logout = () => {
        setUsername(null);
        setName(null);
        setToken(null);
    };
    return (
        <AuthContext.Provider value={{ username, name, token, userId, signup, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
    const context = useContext(AuthContext);
    if(!context){
        throw new Error('useAuth must be used within a AuthProvider');
    }
    return context;
};
