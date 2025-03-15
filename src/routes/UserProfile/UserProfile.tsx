import { useContext, useState } from 'react';
import { AuthContext } from '../../context/authContext';
import styles from './UserProfile.module.css';
import { CustomModal } from '../../components/CustomModal/CustomModal';
import { PostsFromUserContainer } from '../../components/PostsFromUserContainer/PostsFromUserContainer';
import { useParams } from 'react-router-dom';

export const UserProfile = () => {
    const [ showComponent, setShowComponent ] = useState('posts');
    const { usernamestring } =useParams();
    const authContext = useContext(AuthContext);

    if(!authContext){
        throw new Error('Error al cargar login');
    };
    const { name, username } = authContext;
    return (
        <div className={styles['container']}>
            <h2>User profile</h2>
            { username===usernamestring && (
                <>
                    <h3>{name}</h3>
                    <br/>
                    <div>
                        <button onClick={() => setShowComponent('posts')}>POSTS</button>
                        {/* <button onClick={() => setShowComponent('saved')}>SAVED</button>
                            <button onClick={() => setShowComponent('tagged')}>TAGGED</button> */}
                    </div>
                    {showComponent==='posts' && (
                        <PostsFromUserContainer />
                    )}
                    {/* <fieldset>
                        <legend>Settigns</legend>
                        <span>Activate private account: <button>true</button> <button className={styles['info-btn']} >i</button></span>
                        <CustomModal/>
                    </fieldset> */}
                </>
            )}
            {username!==usernamestring && (
                <>
                    usuario diferente
                    <>
                        <br/>
                        <div>
                            <button onClick={() => setShowComponent('posts')}>POSTS</button>
                            {/* <button onClick={() => setShowComponent('saved')}>SAVED</button>
                            <button onClick={() => setShowComponent('tagged')}>TAGGED</button> */}
                        </div>
                        {showComponent==='posts' && (
                            <PostsFromUserContainer/>
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
