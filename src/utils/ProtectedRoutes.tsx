import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';

interface ProtectedRoutesProps {
    children: ReactNode;
}

export const ProtectedRoutes = ({ children }: ProtectedRoutesProps) => {
    const { token } = useAuth();
    return token ? <>{children}</> : <Navigate to='/accounts/login' />;
};
