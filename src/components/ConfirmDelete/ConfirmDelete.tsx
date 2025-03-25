import { useModal } from '../../context/modalContext';
import { usePost } from '../../context/postContext';
import styles from './ConfirmDelete.module.css';

interface ConfirmDeleteProps {
    postId: number;
    onCancel: () => void;
    onDeleteSuccess: () => void;
}

export const ConfirmDelete = ({ postId, onCancel, onDeleteSuccess }: ConfirmDeleteProps) => {
    const { deletePostById } = usePost();
    const { handleClose: handleModalClose } = useModal();

    const handleDelete = async () => {
        onDeleteSuccess();
        handleModalClose();
        await deletePostById(postId);
    };

    return (
        <div className={styles['confirm-delete']}>
            <div>
                <h3>Delete post?</h3>
                <p>Are you sure you want to delete this post?</p>
            </div>
            <div onClick={handleDelete} className={styles['delete-btn']}>Delete</div>
            <div onClick={onCancel} className={styles['cancel-btn']}>Cancel</div>
        </div>
    );
};
