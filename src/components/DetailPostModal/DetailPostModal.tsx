import { Box, Modal } from '@mui/material';
import { useModal } from '../../context/modalContext';
import styles from './DetailPostModal.module.css';
import { ImageIndicators } from '../ImageIndicators/ImageIndicators';
import { SliceArrowImageButtons } from '../SliceArrowImageButtons/SliceArrowImageButtons';
import { useSpreadModal } from '../../context/spreadModalContext';
import { Comments } from '../Comments/Comments';
import { PostActions } from '../PostsActions/PostActions';
import { useRef } from 'react';

export const DetailPostModal = () => {
    const { open: openModal, postData, currentIndex, handleClose, handlePrevious, handleNext } = useModal();
    const { handleOpen: handleSpreadModalOpen } = useSpreadModal();
    const commentInputRef = useRef<HTMLInputElement>(null);

    if (!postData) {
        return null; // Si postData es null, no renderiza nada
    }

    const handleComment = () => {
        commentInputRef.current?.focus(); // Enfocar el input
    };

    return (
        <Modal
            open={openModal}
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
                    <div className={styles['top']}>
                        <div><strong>{postData.author.username}</strong></div>
                        <div onClick={() => handleSpreadModalOpen(postData)} className={styles['spread-button']}>···</div>
                    </div>
                    <div className={styles['middle']}>
                        <p className={styles['description']}><strong>{postData.author.username}</strong> {postData.description}</p>
                        <Comments/>
                    </div>
                    <div className={styles['bottom']}>
                        <PostActions post={postData} handleComment={handleComment}/>
                        <div className={styles['input-container']}>
                            <input ref={commentInputRef} placeholder='Add a comment...'/><button>Post</button>
                        </div>
                    </div>
                </div>

            </Box>
        </Modal>

    );
};
