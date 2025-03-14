import { useContext } from 'react';
import { PostContext } from '../../context/postContext';
import {  PostResponse } from '../../types/types';
import { PostFromLoggedUser } from '../PostFromLoggedUser/PostFromLoggedUser';
import styles from './PostsFromLoggedUserContainer.module.css';

export const PostsFromLoggedUserContainer = () => {
    const postContext = useContext(PostContext);
    if(!postContext){
        throw new Error('Error al cargar PostsFromLoggedUserContainer');
    };
    const { postsFromLoggedUser } = postContext;
    return (
        <div className={styles['container']}>
            {postsFromLoggedUser.length>0 && (
                postsFromLoggedUser.map((post: PostResponse) => (
                    <PostFromLoggedUser key={post.id} post={post}/>
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
