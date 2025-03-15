import { PostResponseProps } from '../../types/types';
import styles from './PostFromUserProfile.module.css';

export const PostFromUserProfile = ({ post }: PostResponseProps) => {
    return (
        <div className={styles['post-container']}>
            <img className={styles['image']} src={post.media[0].mediaUrl}/>
        </div>
    );
};
