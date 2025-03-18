import { createContext, ReactNode, useContext, useState } from 'react';

interface ModalContextProps {
    open: boolean;
    handleOpen: () => void;
    handleClose: () => void;
}

const ModalContext = createContext<ModalContextProps | null>(null);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
    const [ open, setOpen ] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <ModalContext.Provider value={{ open, handleOpen, handleClose }}>
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