import { NotesContainer } from '../NotesContainer/NotesContainer';
import { useContext } from 'react';
import { AuthContext } from '../../context/authContext';
export const Home = () => {
    const authContext = useContext(AuthContext);
    if(!authContext){
        throw new Error('Error al cargar main page');
    }
    const { name } = authContext;

    return (
        <div>
            {name && (
                <>
                    <h1>Hello {name}</h1>
                    <br/>
                    <NotesContainer/>
                </>
            )}
            {!name && (
                <>
                    <NotesContainer/>
                </>
            )}
        </div>
    );
};
