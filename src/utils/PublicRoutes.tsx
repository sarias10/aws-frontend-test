import { ReactNode, useContext } from 'react';
import { AuthContext } from '../context/authContext';
import { Navigate } from 'react-router-dom';

interface PublicRoutesProps {
    children: ReactNode;
}

export const PublicRoutes = ({ children }: PublicRoutesProps) => {
    const authContext = useContext(AuthContext);
    if(!authContext){
        throw new Error('No AuthContext found');
    };
    const { token } = authContext;
    return token ? <Navigate to='/' />: <>{children}</>;
};
