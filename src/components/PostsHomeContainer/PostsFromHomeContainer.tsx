import { useContext } from 'react';
import { PostContext } from '../../context/postContext';
import {  PostResponse } from '../../types/types';
import { PostFromHome } from '../PostFromHome/PostFromHome';
import styles from './PostsFromHomeContainer.module.css';

export const PostsFromHomeContainer = () => {
    const postContext = useContext(PostContext);
    if(!postContext){
        throw new Error('Error al cargar PostsContainer');
    };
    const { visiblePosts } = postContext;
    return (
        <div className={styles['posts-container']}>
            {visiblePosts && (
                visiblePosts.map((post : PostResponse) => (
                    <PostFromHome key={post.id} post={post}/>
                ))
            )}
        </div>
    );
};
