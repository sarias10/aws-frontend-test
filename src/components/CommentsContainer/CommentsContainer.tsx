import { useModal } from '../../context/modalContext';
import { CommentCard } from '../CommentCard/CommentCard';
import { Loading } from '../Loading/Loading';
import styles from './CommentsContainer.module.css';

export const CommentsContainer = () => {
    const { postData, postComments } = useModal();

    if(!postComments || !postData){
        return null;
    }
    return (
        <div className={styles['commentsContainer']}>
            {!postComments? (
                <>
                    <p className={styles['description']}>
                        <strong>{postData.author.username}</strong> {postData.description}
                    </p>
                    <Loading />
                </>

            ) : (
                <>
                    <p className={styles['description']}>
                        <strong>{postData.author.username}</strong> {postData.description}
                    </p>
                    {postComments.map(comment => (
                        <CommentCard key={comment.id} comment={comment} />
                    ))}
                </>
            )}
        </div>
    );
};