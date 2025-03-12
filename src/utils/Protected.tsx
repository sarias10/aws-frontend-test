import { ReactNode, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';

interface ProtectedProps {
    children: ReactNode;
}

export const Protected = ({ children }: ProtectedProps) => {
    const authContext = useContext(AuthContext);
    if(!authContext){
        throw new Error('');
    };
    const { token } = authContext;
    return token ? <>{children}</> : <Navigate to='/login' />;
};
