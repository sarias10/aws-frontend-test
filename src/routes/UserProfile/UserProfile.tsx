import { useEffect, useState } from 'react';
import {  useAuth } from '../../context/authContext';
import styles from './UserProfile.module.css';
import { PostsFromUserContainer } from '../../components/PostsFromUserContainer/PostsFromUserContainer';
import { useParams } from 'react-router-dom';
import {  usePost } from '../../context/postContext';
import { Loading } from '../../components/Loading/Loading';

export const UserProfile = () => {
    const [ showComponent, setShowComponent ] = useState('posts');
    const [ loading, setLoading ] = useState<boolean>(false);

    const { usernameParam } = useParams();

    const { otherUser, visiblePostsFromOtherUser } = usePost();
    const { name, username } = useAuth(); // Del usuario loggeado
    const { getVisiblePostsFromUser, getUser, postsFromLoggedUser } = usePost();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                await getUser(usernameParam as string);
                await getVisiblePostsFromUser(usernameParam as string);
                console.log(otherUser);
                console.log(visiblePostsFromOtherUser);
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
                    <div className={styles['top-container']}>
                        <h3>{name}</h3>
                    </div>
                    <div className={styles['bottom-container']}>
                        <div className={styles['button-container']}>
                            <button className={showComponent === 'posts'?styles['active']:styles['']} onClick={() => setShowComponent('posts')}>POSTS</button>
                            {/*
                            <button className={showComponent === 'saved'?styles['active']:styles['']} onClick={() => setShowComponent('saved')}>SAVED</button>
                            <button className={showComponent === 'tagged'?styles['active']:styles['']} onClick={() => setShowComponent('tagged')}>TAGGED</button> */}
                        </div>

                        {showComponent==='posts' && (
                            <PostsFromUserContainer posts={postsFromLoggedUser}/>
                        )}
                    </div>
                </>
            ) : otherUser ? ( // Se muestra otro usuario público
                <>
                    <div className={styles['top-container']}>
                        <h3>{otherUser.name}</h3>
                    </div>
                    <div className={styles['bottom-container']}>
                        <div className={styles['button-container']}>
                            <button className={showComponent === 'posts'?styles['active']:styles['']} onClick={() => setShowComponent('posts')}>POSTS</button>
                            {/* <button onClick={() => setShowComponent('saved')}>SAVED</button>
                            <button onClick={() => setShowComponent('tagged')}>TAGGED</button> */}
                        </div>

                        {showComponent==='posts' && (
                            <PostsFromUserContainer posts={visiblePostsFromOtherUser} />
                        )}
                    </div>

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
