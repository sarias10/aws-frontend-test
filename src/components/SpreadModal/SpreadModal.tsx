import { Modal } from '@mui/material';
import styles from './SpreadModal.module.css';
import { useSpreadModal } from '../../context/spreadModalContext';
import { usePost } from '../../context/postContext';
import { useModal } from '../../context/modalContext';
import { useAuth } from '../../context/authContext';
import { PrincipalMenu } from '../PrincipalMenu/PrincipalMenu';
import { ConfirmDelete } from '../ConfirmDelete/ConfirmDelete';

export const SpreadModal = () => {
    const {
        open: openSpreadModal,
        activeMenu,
        postData,
        handleClose: handleSpreadModalClose,
        handleActiveMenu
    } = useSpreadModal();

    const { deletePostById } = usePost();

    const { handleClose: handleModalClose } = useModal();

    const { userId: loggedUserId } = useAuth();

    if(!postData){
        return null;
    }

    const handleDelete = async () => {
        await deletePostById(postData.id);
        handleSpreadModalClose();
        handleModalClose();
    };

    const openConfirmDeleteButton = () =>{
        handleActiveMenu('confirmDelete');
    };

    return (
        <Modal
            open={openSpreadModal}
            onClose={handleSpreadModalClose}
        >
            <div className={styles['box']}>
                { activeMenu === 'principalMenu' && (
                    <ul>
                        {loggedUserId === postData.author.id && (// Se comprueba que el usuario loggeado sea el dueño del post para poder eliminar o editar el post
                            <>
                                <li onClick={openConfirmDeleteButton} className={styles['delete']}>Delete</li>
                            </>
                        )}
                        <li onClick={handleSpreadModalClose}>Cancel</li>

                    </ul>
                )}
                { loggedUserId === postData.author.id && activeMenu === 'confirmDelete' && (
                    <>
                        <ConfirmDelete postId={postData.id} onCancel={() => handleActiveMenu('principalMenu')} onDeleteSuccess={handleSpreadModalClose}/>
                    </>
                )}
            </div>
        </Modal>
    );
};
