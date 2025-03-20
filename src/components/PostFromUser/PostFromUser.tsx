import { useModal } from '../../context/modalContext';
import { PostResponseProps } from '../../types/types';
import styles from './PostFromUser.module.css';

export const PostFromUserProfile = ({ post }: PostResponseProps) => {
    const { handleOpen } = useModal();
    return (
        <div onClick={() => handleOpen(post)} className={styles['post-container']}>
            <img className={styles['image']} src={post.media[0].mediaUrl}/>
        </div>
    );
};
