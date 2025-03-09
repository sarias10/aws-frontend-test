import { useContext } from 'react';
import { AuthContext } from '../../context/authContext';

export const UserProfile = () => {
    const authContext = useContext(AuthContext);
    if(!authContext){
        throw new Error('Error al cargar login');
    };
    const { name } = authContext;
    return (
        <>
            <h3>{name}</h3>
        </>

    );
};
