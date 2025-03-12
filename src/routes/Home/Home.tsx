import { useContext } from 'react';
import { AuthContext } from '../../context/authContext';
export const Home = () => {
    const authContext = useContext(AuthContext);
    if(!authContext){
        throw new Error('Error al cargar main page');
    }
    //const { name } = authContext;

    return (
        <div>
            <h1>Home</h1>
        </div>
    );
};
