import { Box, Modal } from '@mui/material';
import { useModal } from '../../context/modalContext';
import styles from './DetailPostModal.module.css';
import { ImageIndicators } from '../ImageIndicators/ImageIndicators';
import { SliceArrowImageButtons } from '../SliceArrowImageButtons/SliceArrowImageButtons';

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
                            <SliceArrowImageButtons handlePrevious={handlePrevious} handleNext={handleNext} disabledLeft={currentIndex === 0} disabledRight={currentIndex === postData.media.length-1}/>
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
