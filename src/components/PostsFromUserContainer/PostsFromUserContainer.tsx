import {  PostResponse, PostsResponseProps } from '../../types/types';
import { PostFromUserProfile } from '../PostFromUser/PostFromUser';
import styles from './PostsFromUserContainer.module.css';

export const PostsFromUserContainer = ( { posts }: PostsResponseProps ) => {
    return (
        <div className={styles['container']}>
            {posts && posts.length>0 && (
                posts.map((post: PostResponse) => (
                    <PostFromUserProfile key={post.id} post={post}/>
                ))
            )}
            {posts.length===0 && (
                <div>
                    There are no posts to display.
                </div>
            )}
        </div>
    );
};
