import { FaHeart,FaRegHeart, FaRegComment } from 'react-icons/fa';
import { usePost } from '../../context/postContext';
import styles from './PostActions.module.css';
import { PostResponseProps } from '../../types/types';

interface PostActionsProps extends PostResponseProps{
    handleComment: () => void;
}

// PostActions puede recibir datos de post de PostFromHome o DetailPostModal
export const PostActions = ({ post, handleComment }: PostActionsProps) => {

    const { createLike } = usePost();

    const handleLike = () => {
        createLike(post.id);
    };
    return (
        <div className={styles['actions-container']}>
            <div className={styles['actions']}>
                <button onClick={handleLike} className={styles['button']}>
                    {post.hasLiked ? <FaHeart className={styles['liked']} /> : <FaRegHeart />}
                </button>
                <button onClick={handleComment} className={styles['button']}>
                    <FaRegComment />
                </button>
                {/* <button>Share</button> */}
            </div>
            <div className={styles['likes-count']}>{post.likesCount} likes</div>
        </div>

    );
};
