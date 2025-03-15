import { ReactNode, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';

interface ProtectedRoutesProps {
    children: ReactNode;
}

export const ProtectedRoutes = ({ children }: ProtectedRoutesProps) => {
    const authContext = useContext(AuthContext);
    if(!authContext){
        throw new Error('');
    };
    const { token } = authContext;
    return token ? <>{children}</> : <Navigate to='/accounts/login' />;
};
