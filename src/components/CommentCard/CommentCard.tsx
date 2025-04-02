import { CommentByPostId } from '../../types/types';
import styles from './CommentCard.module.css';

interface CommentByPostIdProps {
    comment: CommentByPostId;
}
export const CommentCard = ({ comment }: CommentByPostIdProps) => {
    return (
        <div className={styles['commentCard']}>
            <strong className={styles['username']}>{comment.author.username}</strong>
            <span className={styles['text']}>{comment.content}</span>
        </div>
    );
};
