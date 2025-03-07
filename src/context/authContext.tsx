import { createContext, PropsWithChildren } from 'react';
import { AuthProviderProps, LoginType } from '../types/types';
import publicServices from '../services/public';
import { useLocalStorage } from '../utils/useLocalStorage';

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthProviderProps>({
    username: null,
    name: '',
    token: '',
    login: () => {},
    logout: () => {}
});

export const AuthContextProvider = ({ children }: PropsWithChildren<object>) => {
    const [ username, setUsername ] = useLocalStorage<string|null>('username',null);
    //useState<string | null>(null);
    const [ name, setName ] = useLocalStorage<string >('name','');
    const [ token, setToken ] = useLocalStorage<string>('token','');

    const login = async (data:LoginType) => {
        const response = await publicServices.login(data);
        const usernameResponse = response.data.username;
        const nameResponse = response.data.name;
        const tokenResponse = response.data.token;
        setUsername(usernameResponse);
        setName(nameResponse);
        setToken(tokenResponse);
        window.localStorage.setItem('username', JSON.stringify(response.data));
        window.localStorage.setItem('name', JSON.stringify(response.data));
        window.localStorage.setItem('token', JSON.stringify(response.data));
    };

    const logout = () => {
        setUsername(null);
        setName('');
        setToken('');
    };
    return (
        <AuthContext.Provider value={{ username, name, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
