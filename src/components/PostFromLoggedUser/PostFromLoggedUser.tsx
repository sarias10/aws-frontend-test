import { PostResponseProps } from '../../types/types';
import styles from './PostFromLoggedUser.module.css';

export const PostFromLoggedUser = ({ post }: PostResponseProps) => {
    return (
        <div className={styles['post-container']}>
            <img className={styles['image']} src={post.media[0].mediaUrl}/>
        </div>
    );
};
