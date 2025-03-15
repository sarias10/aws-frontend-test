import { useContext, useState } from 'react';
import { AuthContext } from '../../context/authContext';
import styles from './UserProfile.module.css';
import { CustomModal } from '../../components/CustomModal/CustomModal';
import { PostsFromLoggedUserContainer } from '../../components/PostsFromLoggedUserContainer/PostsFromLoggedUser';

export const UserProfile = () => {
    const [ showComponent, setShowComponent ] = useState('posts');
    const authContext = useContext(AuthContext);
    if(!authContext){
        throw new Error('Error al cargar login');
    };
    const { name } = authContext;
    return (
        <div className={styles['container']}>
            <h2>User profile</h2>
            <h3>{name}</h3>
            <br/>
            <div>
                <button onClick={() => setShowComponent('posts')}>POSTS</button>
                {/* <button onClick={() => setShowComponent('saved')}>SAVED</button>
                <button onClick={() => setShowComponent('tagged')}>TAGGED</button> */}
            </div>
            {showComponent==='posts' && (
                <PostsFromLoggedUserContainer/>
            )}
            {/* <fieldset>
                <legend>Settigns</legend>
                <span>Activate private account: <button>true</button> <button className={styles['info-btn']} >i</button></span>
                <CustomModal/>
            </fieldset> */}
        </div>

    );
};
