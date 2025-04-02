import { Box, Modal } from '@mui/material';
import { useModal } from '../../context/modalContext';
import styles from './DetailPostModal.module.css';
import { ImageIndicators } from '../ImageIndicators/ImageIndicators';
import { SliceArrowImageButtons } from '../SliceArrowImageButtons/SliceArrowImageButtons';
import { useSpreadModal } from '../../context/spreadModalContext';
import { CommentsContainer } from '../CommentsContainer/CommentsContainer';
import { PostActions } from '../PostsActions/PostActions';
import { ChangeEvent, useEffect, useRef, useState } from 'react';

export const DetailPostModal = () => {
    const { open: openModal, postData, currentIndex, handleClose, handlePrevious, handleNext, createComment } = useModal();
    const { handleOpen: handleSpreadModalOpen } = useSpreadModal();

    const [ content, setContent ] = useState<string>('');

    const commentInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if(!openModal) {
            setContent('');
        };
    }, [ openModal ]);

    if (!postData) {
        return null; // Si postData es null, no renderiza nada
    }

    const handleComment = () => {
        commentInputRef.current?.focus(); // Enfocar el input
    };

    const handleCreateComment = async () => {
        setContent(''); // Se limpia para no tener que esperar la respuesta
        await createComment(content);
    };

    const handleContentChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setContent(value);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Evita el comportamiento por defecto (como saltar de línea)
            if (content.trim()) { // Asegura que no se envíen comentarios vacíos
                handleCreateComment();
            }
        }
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
                        <CommentsContainer/>
                    </div>
                    <div className={styles['bottom']}>
                        <PostActions post={postData} handleComment={handleComment}/>
                        <div className={styles['input-container']}>
                            <input
                                type='text'
                                autoComplete="off"
                                name='content'
                                onChange={handleContentChange}
                                onKeyDown={handleKeyDown}
                                value={content}
                                ref={commentInputRef}
                                placeholder='Add a comment...'
                            /><button onClick={handleCreateComment}>
                                Post
                            </button>
                        </div>
                    </div>
                </div>

            </Box>
        </Modal>

    );
};
