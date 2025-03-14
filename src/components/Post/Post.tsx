import { PostResponseProps } from '../../types/types';
import styles from './Post.module.css';

export const Post = ({ post }: PostResponseProps) => {
    return (
        <div className={styles['post']}>
            <div>{post.author.username}</div>
            <img className={styles['post-image']} src={post.media[0].mediaUrl}/>
            <div>
                <button>Like</button>
                <button>Comment</button>
                <button>Share</button>
            </div>
            <div>{post.likesCount} likes</div>
            <div>
                <span><strong>{post.author.username}</strong> {post.description}</span>
            </div>
            <div><a>View all {post.likesCount} comments</a></div>
        </div>
    );
};
