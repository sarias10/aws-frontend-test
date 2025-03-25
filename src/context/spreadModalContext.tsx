import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { PostResponse } from '../types/types';

interface SpreadModalProps {
    open: boolean;
    activeMenu: string;
    postData: PostResponse | null;
    handleOpen: (postData: PostResponse) => void;
    handleClose: () => void;
    handleActiveMenu: (menuSent: string) => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const SpreadModalContext = createContext<SpreadModalProps | null>(null);

export const SpreadModalProvider = ({ children }: { children: ReactNode }) => {
    const [ open, setOpen ] = useState(false);

    const [ activeMenu, setActiveMenu ] = useState<string>('principalMenu'); // estado para controlar el menu mostrado

    const [ postData, setPostData ] = useState<PostResponse | null>(null);

    const handleOpen = (postData: PostResponse) => {
        setPostData(postData);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleActiveMenu = (menuSent: string) =>{
        setActiveMenu(menuSent);
    };

    useEffect(()=>{
        if(open) {
            setActiveMenu('principalMenu');
        }
    }, [ open ]);

    return (
        <SpreadModalContext.Provider value={{ open, activeMenu, postData, handleOpen, handleClose, handleActiveMenu }}>
            {children}
        </SpreadModalContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useSpreadModal = () => {
    const context = useContext(SpreadModalContext);
    if(!context){
        throw new Error('useSpreadModal must be used within a SpreadModalProvider');
    }
    return context;
};