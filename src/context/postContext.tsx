import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import { PostContextType, PostResponse } from '../types/types';
import protectedServices from '../services/protected';

import { AuthContext } from './authContext';
// eslint-disable-next-line react-refresh/only-export-components
export const PostContext = createContext<PostContextType| null>(null);

export const PostProvider = ({ children }: PropsWithChildren<object>) => {
    const [ visiblePosts, setVisiblePosts ] = useState<PostResponse[]>([]);

    const authContext = useContext(AuthContext);

    if(!authContext){
        throw new Error('Error al cargar authContext en PostProvider');
    };
    const { token } = authContext;

    useEffect(()=>{
        const getVisiblePosts = async () => {
            const response = await protectedServices.getAllVisiblePosts(token);
            const data = response.data;
            setVisiblePosts(data);
        };
        getVisiblePosts();
    },[ token ]);

    const createPost = () => {

    };

    return(
        <PostContext.Provider value={{ visiblePosts, createPost }}>
            {children}
        </PostContext.Provider>
    );
};