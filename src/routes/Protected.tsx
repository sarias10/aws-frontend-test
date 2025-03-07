import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/authContext';

export const Protected = () => {
    const authContext = useContext(AuthContext);
    if(!authContext){
        throw new Error('');
    };
    const { token } = authContext;
    return token ? <Outlet /> : <Navigate to='/' />;
};
