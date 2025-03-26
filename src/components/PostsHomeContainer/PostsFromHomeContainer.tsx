import { usePost } from '../../context/postContext';
import {  PostResponse } from '../../types/types';
import { PostFromHome } from '../PostFromHome/PostFromHome';
import styles from './PostsFromHomeContainer.module.css';
import { Loading } from '../Loading/Loading';
import { useEffect, useState } from 'react';

export const PostsFromHomeContainer = () => {
    const [ showNoPosts, setShowNoPosts ] = useState(false);

    const { visiblePosts } = usePost();

    useEffect(() => {
        const timer = setTimeout(() => {
            if(visiblePosts.length === 0){
                setShowNoPosts(true);
            }
        }, 3000);

        return () =>  clearTimeout(timer); // Limpia el timer si los posts llegan antes
    }, [ visiblePosts ]);

    return (
        <div className={styles['posts-container']}>
            {visiblePosts.length === 0 ? (
                showNoPosts ? <p>There are no posts</p> : <Loading />
            ):(
                visiblePosts.map((post : PostResponse) => (
                    <PostFromHome key={post.id} post={post}/>
                ))
            )}
        </div>
    );
};
