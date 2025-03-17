import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/authContext';
import styles from './UserProfile.module.css';
import { CustomModal } from '../../components/CustomModal/CustomModal';
import { PostsFromUserContainer } from '../../components/PostsFromUserContainer/PostsFromUserContainer';
import { useParams } from 'react-router-dom';
import { PostContext } from '../../context/postContext';
import { PostResponse } from '../../types/types';

export const UserProfile = () => {
    const [ showComponent, setShowComponent ] = useState('posts');
    const [ visiblePosts, setVisiblePosts ] = useState<PostResponse[]>([]);

    const { usernameParam } =useParams();
    const authContext = useContext(AuthContext);
    const postContext = useContext(PostContext);

    if(!authContext){
        throw new Error('Error al cargar AuthContext en UserProfile');
    };
    if(!postContext){
        throw new Error('Error al cargar PostContext en UserProfile');
    };
    const { name, username } = authContext;
    const { getVisiblePostsFromUser, postsFromLoggedUser } = postContext;

    useEffect(() => {
        const fetchPosts = async () => {
            if(username !== usernameParam) {
                const posts = await getVisiblePostsFromUser(usernameParam as string);
                if (posts){
                    setVisiblePosts(posts);
                }
            }
        };
        fetchPosts();
        console.log(visiblePosts);
    }, [ usernameParam, username, visiblePosts, getVisiblePostsFromUser ]);
    return (
        <div className={styles['container']}>
            <h2>User profile</h2>
            { username===usernameParam && ( // se muestra el usuario loggeado
                <>
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
            )}
            {username!==usernameParam && ( // se muestra otro usuario público
                <>
                    {usernameParam}
                    <>
                        <br/>
                        <div>
                            <button onClick={() => setShowComponent('posts')}>POSTS</button>
                            {/* <button onClick={() => setShowComponent('saved')}>SAVED</button>
                            <button onClick={() => setShowComponent('tagged')}>TAGGED</button> */}
                        </div>
                        {showComponent==='posts' && (
                            <PostsFromUserContainer posts={visiblePosts} />
                        )}
                        {/* <fieldset>
                        <legend>Settigns</legend>
                        <span>Activate private account: <button>true</button> <button className={styles['info-btn']} >i</button></span>
                        <CustomModal/>
                    </fieldset> */}
                    </>
                </>
            )}
        </div>

    );
};
