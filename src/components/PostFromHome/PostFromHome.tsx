import { useState } from 'react';
import { PostResponseProps } from '../../types/types';
import styles from './PostFromHome.module.css';
import { useModal } from '../../context/modalContext';
import { ImageIndicators } from '../ImageIndicators/ImageIndicators';
import { SliceArrowImageButtons } from '../SliceArrowImageButtons/SliceArrowImageButtons';

export const PostFromHome = ({ post }: PostResponseProps) => {
    const files = post.media; // Array con las imagenes y videos
    const [ currentIndex, setCurrentIndex ] = useState(0);
    const { handleOpen } = useModal();

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

    return (
        <div className={styles['post']}>
            <div>{post.author.username}</div>
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
            <div>
                <button>Like</button>
                <button>Comment</button>
                <button>Share</button>
            </div>
            <div>{post.likesCount} likes</div>
            <div>
                <span><strong>{post.author.username}</strong> {post.description}</span>
            </div>
            <div onClick={() => handleOpen(post)}>View all {post.commentsCount} comments</div>
            <div onClick={() => handleOpen(post)}>Add comment</div>
        </div>
    );
};
