import { useContext } from 'react';
import { PostContext } from '../../context/postContext';
import {  PostResponse } from '../../types/types';
import { Post } from '../Post/Post';
import styles from './PostsContainer.module.css';

export const PostsContainer = () => {
    const postContext = useContext(PostContext);
    if(!postContext){
        throw new Error('Error al cargar PostsContainer');
    };
    const { visiblePosts } = postContext;
    return (
        <div className={styles['posts-container']}>
            {visiblePosts && (
                visiblePosts.map((post : PostResponse) => (
                    <Post key={post.id} post={post}/>
                ))
            )}
        </div>
    );
};
