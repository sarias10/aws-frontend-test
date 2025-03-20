import { Box, IconButton, Modal } from '@mui/material';
import { useModal } from '../../context/modalContext';
import styles from './DetailPostModal.module.css';
import { ArrowBack, ArrowForward } from '@mui/icons-material';

export const DetailPostModal = () => {
    const { open, postData, currentIndex, handleClose, handlePrevious, handleNext } = useModal();
    if (!postData) {
        return null; // Si postData es null, no renderiza nada
    }
    return (
        <Modal
            open={open}
            onClose={handleClose}
        >
            <Box className={styles['box']}>
                <div className='left-container'>
                    <div className={styles['image-container']}>
                        <img className={styles['image']} src={postData.media[currentIndex].mediaUrl}/>
                    </div>
                    <div>
                        <IconButton onClick={handlePrevious} disabled={currentIndex === 0}>
                            <ArrowBack/>
                        </IconButton>
                        <IconButton onClick={handleNext} disabled={currentIndex === postData.media.length -1}>
                            <ArrowForward/>
                        </IconButton>
                    </div>
                </div>
                <div className={styles['details']}>
                    <p className={styles['username']}><strong>{postData.author.username}</strong></p>
                    <p className={styles['description']}><strong>{postData.author.username}</strong> {postData.description}</p>
                </div>
            </Box>
        </Modal>

    );
};
