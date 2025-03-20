import { Box, IconButton, Modal } from '@mui/material';
import { useModal } from '../../context/modalContext';
import styles from './DetailPostModal.module.css';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import { ImageIndicators } from '../ImageIndicators/ImageIndicators';

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
                <div className={styles['left-container']}>
                    <img className={styles['image']} src={postData.media[currentIndex].mediaUrl}/>
                    {postData.media.length > 1 && (
                        <>
                            <div className={styles['button-container']}>
                                <button
                                    onClick={handlePrevious}
                                    disabled={currentIndex === 0} // disabled solo acepta valores booleanos. Aquí evalua la condición.
                                    className={styles['custom-button']}
                                >
                                    &lt;
                                </button>
                                <button
                                    onClick={handleNext}
                                    disabled={currentIndex === postData.media.length - 1}
                                    className={styles['custom-button']}
                                >
                                    &gt;
                                </button>
                            </div>
                            <ImageIndicators total={postData.media.length} currentIndex={currentIndex}/>
                        </>
                    )}
                </div>
                <div className={styles['right-container']}>
                    <p className={styles['username']}><strong>{postData.author.username}</strong></p>
                    <p className={styles['description']}><strong>{postData.author.username}</strong> {postData.description}</p>
                </div>
            </Box>
        </Modal>

    );
};
