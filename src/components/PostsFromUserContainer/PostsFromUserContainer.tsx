import { useContext } from 'react';
import { PostContext } from '../../context/postContext';
import {  PostResponse } from '../../types/types';
import { PostFromUserProfile } from '../PostFromUser/PostFromUser';
import styles from './PostsFromUserContainer.module.css';

export const PostsFromUserContainer = () => {
    const postContext = useContext(PostContext);
    if(!postContext){
        throw new Error('Error al cargar PostsFromLoggedUserContainer');
    };
    const { postsFromLoggedUser } = postContext;
    return (
        <div className={styles['container']}>
            {postsFromLoggedUser.length>0 && (
                postsFromLoggedUser.map((post: PostResponse) => (
                    <PostFromUserProfile key={post.id} post={post}/>
                ))
            )}
            {postsFromLoggedUser.length===0 && (
                <div>
                    There are no posts to display.
                </div>
            )}
        </div>
    );
};
