import { useState } from 'react';
import { PostResponseProps } from '../../types/types';
import styles from './PostFromHome.module.css';
import { IconButton } from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';

export const PostFromHome = ({ post }: PostResponseProps) => {
    const files = post.media; // Array con las imagenes y videos
    const [ currentIndex, setCurrentIndex ] = useState(0);

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
            <div>
                {files[currentIndex].mediaType === 'image' ? (
                    <img
                        className={styles['post-image']}
                        src={files[currentIndex].mediaUrl}
                    />
                ) : (
                    <video
                        className={styles['post-image']}
                        src={files[currentIndex].mediaUrl}
                        controls // El atributo 'controls' permite que el navegador muestre controles predeterminados para reproducir, pausar, ajustar el volumen y cambiar a pantalla completa, entre otras funciones.
                    />
                )}
                <div>
                    <IconButton onClick={handlePrevious} disabled={currentIndex === 0}>
                        <ArrowBack />
                    </IconButton>
                    <IconButton onClick={handleNext} disabled={currentIndex === files.length -1}>{/* Se desactiva cuando currentIndex es igual a la ultima posición del array files */}
                        <ArrowForward />
                    </IconButton>
                </div>
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
            <div><a>View all {post.commentsCount} comments</a></div>
        </div>
    );
};
