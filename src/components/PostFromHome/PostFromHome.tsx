import { useState } from 'react';
import { PostResponseProps } from '../../types/types';
import styles from './PostFromHome.module.css';
import { IconButton } from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import { useModal } from '../../context/modalContext';
import { ImageIndicators } from '../ImageIndicators/ImageIndicators';

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
                                disabled={currentIndex === files.length -1}
                                className={styles['custom-button']}
                            >
                                &gt;
                            </button>
                        </div>
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
