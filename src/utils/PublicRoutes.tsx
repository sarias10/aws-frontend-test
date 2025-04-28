import { ReactNode } from 'react';
import { useAuth } from '../context/authContext';
import { Navigate } from 'react-router-dom';

interface PublicRoutesProps {
    children: ReactNode;
}

export const PublicRoutes = ({ children }: PublicRoutesProps) => {
    const { token } = useAuth();
    return token ? <Navigate to='/' />: <>{children}</>;
};
