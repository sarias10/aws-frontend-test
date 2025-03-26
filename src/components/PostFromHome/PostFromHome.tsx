import { useState } from 'react';
import { PostResponseProps } from '../../types/types';
import styles from './PostFromHome.module.css';
import { useModal } from '../../context/modalContext';
import { ImageIndicators } from '../ImageIndicators/ImageIndicators';
import { SliceArrowImageButtons } from '../SliceArrowImageButtons/SliceArrowImageButtons';
import { useSpreadModal } from '../../context/spreadModalContext';
import { FaHeart,FaRegHeart, FaRegComment } from 'react-icons/fa';
import { usePost } from '../../context/postContext';

export const PostFromHome = ({ post }: PostResponseProps) => {
    const files = post.media; // Array con las imagenes y videos
    const [ currentIndex, setCurrentIndex ] = useState(0);
    const { handleOpen: handleModalOpen } = useModal();

    const { handleOpen: handleSpreadModalOpen } = useSpreadModal();

    const { createLike } = usePost();

    const handlePrevious = () => {
        if (currentIndex>0){
            const tempIndex = currentIndex -1;
            setCurrentIndex(tempIndex);
        }
    };

    const handleNext = () => {
        if (currentIndex < files.length -1){ // solo se ejecuta si current index es menor a la última posición del array
            setCurrentIndex(currentIndex + 1);
        }
    };

    const handleLike = () => {
        createLike(post.id);
    };

    const handleComment = () => {

    };

    return (
        <div className={styles['post']}>
            <div className={styles['username']}>
                <div><strong>{post.author.username}</strong></div>
                <div onClick={() => handleSpreadModalOpen(post)} className={styles['spread-button']}>···</div>
            </div>
            <div className={styles['image-container']}>
                {files[currentIndex].mediaType === 'image' ? (
                    <img
                        className={styles['image']}
                        src={files[currentIndex].mediaUrl}
                    />
                ) : (
                    <video
                        className={styles['image']}
                        src={files[currentIndex].mediaUrl}
                        controls // El atributo 'controls' permite que el navegador muestre controles predeterminados para reproducir, pausar, ajustar el volumen y cambiar a pantalla completa, entre otras funciones.
                    />
                )}
                {files.length > 1 && (
                    <>
                        <SliceArrowImageButtons handlePrevious={handlePrevious} handleNext={handleNext} disabledLeft={currentIndex===0} disabledRight={currentIndex === files.length -1}/>
                        <ImageIndicators total={files.length} currentIndex={currentIndex}/>
                    </>
                )}

            </div>
            <div className={styles.actions}>
                <button onClick={handleLike} className={styles.button}>
                    {post.hasLiked ? <FaHeart className={styles.liked} /> : <FaRegHeart />}
                </button>
                <button onClick={handleComment} className={styles.button}>
                    <FaRegComment />
                </button>
                {/* <button>Share</button> */}
            </div>
            <div>{post.likesCount} likes</div>
            <div>
                <span><strong>{post.author.username}</strong> {post.description}</span>
            </div>
            <div className={styles['view-comments']} onClick={() => handleModalOpen(post)}>View all {post.commentsCount} comments</div>
            <div className={styles['add-comment']} onClick={() => handleModalOpen(post)}>Add comment</div>
        </div>
    );
};
