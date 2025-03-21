import { useContext } from 'react';
import { AuthContext } from '../../context/authContext';
import { PostsFromHomeContainer } from '../../components/PostsHomeContainer/PostsFromHomeContainer';
export const Home = () => {
    const authContext = useContext(AuthContext);

    if(!authContext){
        throw new Error('Error al cargar main page');
    }

    return (
        <div>
            <PostsFromHomeContainer/>
        </div>
    );
};
