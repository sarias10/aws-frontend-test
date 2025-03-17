import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/authContext';
import styles from './UserProfile.module.css';
import { PostsFromUserContainer } from '../../components/PostsFromUserContainer/PostsFromUserContainer';
import { useParams } from 'react-router-dom';
import { PostContext } from '../../context/postContext';
import { PostResponse, User } from '../../types/types';
import { Loading } from '../../components/Loading/Loading';

export const UserProfile = () => {
    const [ showComponent, setShowComponent ] = useState('posts');
    const [ visiblePostsFromOtherUser, setVisiblePostsFromOtherUser ] = useState<PostResponse[]>([]);
    const [ otherUser, setOtherUser ] = useState<User | null>(null);
    const [ loading, setLoading ] = useState<boolean>(false);

    const { usernameParam } =useParams();
    const authContext = useContext(AuthContext);
    const postContext = useContext(PostContext);

    if(!authContext){
        throw new Error('Error al cargar AuthContext en UserProfile');
    };
    if(!postContext){
        throw new Error('Error al cargar PostContext en UserProfile');
    };
    const { name, username } = authContext; // Del usuario loggeado
    const { getVisiblePostsFromUser, getUser, postsFromLoggedUser } = postContext;

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const [ userConsulted, posts ] = await Promise.all([
                    getUser(usernameParam as string),
                    getVisiblePostsFromUser(usernameParam as string)
                ]);

                if (userConsulted) setOtherUser(userConsulted);
                if (posts) setVisiblePostsFromOtherUser(posts);

            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        if(username !== usernameParam){ // Solo se consultan los datos si el usuario loggeado (username) es diferente al usernameParam
            fetchData();
        }

    }, [ usernameParam ]);

    if (loading){
        return <Loading message="Fetching data, please wait..." />; // Aquí se muestra el spinner
    }

    return (
        <div className={styles['container']}>
            { username===usernameParam ? ( // se muestra el usuario loggeado
                <>
                    <h2>User profile</h2>
                    <h3>{name}</h3>
                    <br/>
                    <div>
                        <button onClick={() => setShowComponent('posts')}>POSTS</button>
                        {/* <button onClick={() => setShowComponent('saved')}>SAVED</button>
                            <button onClick={() => setShowComponent('tagged')}>TAGGED</button> */}
                    </div>
                    {showComponent==='posts' && (
                        <PostsFromUserContainer posts={postsFromLoggedUser}/>
                    )}
                    {/* <fieldset>
                        <legend>Settigns</legend>
                        <span>Activate private account: <button>true</button> <button className={styles['info-btn']} >i</button></span>
                        <CustomModal/>
                    </fieldset> */}
                </>
            ) : otherUser ? ( // Se muestra otro usuario público
                <>
                    <h2>User profile</h2>
                    {otherUser.name}
                    <br/>
                    <div>
                        <button onClick={() => setShowComponent('posts')}>POSTS</button>
                        {/* <button onClick={() => setShowComponent('saved')}>SAVED</button>
                            <button onClick={() => setShowComponent('tagged')}>TAGGED</button> */}
                    </div>
                    {showComponent==='posts' && (
                        <PostsFromUserContainer posts={visiblePostsFromOtherUser} />
                    )}

                </>
            ) : ( // Sino encuentra ningún usuario con ese usernameParam
                <>
                    <h2>Sorry, this page isn't available.</h2>
                    <p>The link you followed may be broken, or the page may have been removed. Go back to Instagram demake</p>
                </>
            )}

        </div>

    );
};
