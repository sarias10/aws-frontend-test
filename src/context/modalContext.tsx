import { createContext, ReactNode, useContext, useState } from 'react';
import { PostResponse } from '../types/types';
interface ModalContextProps {
    open: boolean;
    postData: PostResponse | null;
    currentIndex: number;
    handleOpen: (post: PostResponse) => void;
    handleClose: () => void;
    handlePrevious: () => void;
    handleNext: () => void;
}

const ModalContext = createContext<ModalContextProps | null>(null);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
    const [ open, setOpen ] = useState(false); // Establece si el modal esta abierto o cerrado. El componente se renderiza en el Layout
    const [ postData, setPostData ] = useState<PostResponse | null>(null);
    const [ currentIndex, setCurrentIndex ] = useState(0);

    const handleOpen = (post: PostResponse) => {
        setOpen(true);
        setPostData(post);
    };

    const handleClose = () => {
        setOpen(false);
        setPostData(null);
        setCurrentIndex(0);
    };

    const handlePrevious = () => {
        if(currentIndex>0){
            const tempIndex = currentIndex -1;
            setCurrentIndex(tempIndex);
        }
    };

    const handleNext = () => {
        if(postData && currentIndex < postData.media.length){
            setCurrentIndex(currentIndex + 1);
        }
    };
    return (
        <ModalContext.Provider value={{ open, postData, currentIndex, handleOpen, handleClose, handlePrevious, handleNext }}>
            {children}
        </ModalContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useModal = () => {
    const context = useContext(ModalContext);
    if(!context){
        throw new Error('useModal must be used within a ModalProvider');
    }
    return context;
};