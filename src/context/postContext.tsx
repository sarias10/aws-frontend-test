import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import { Post, PostContextType } from '../types/types';
import protectedServices from '../services/protected';

import { AuthContext } from './authContext';
// eslint-disable-next-line react-refresh/only-export-components
export const PostContext = createContext<PostContextType| null>(null);

export const PostProvider = ({ children }: PropsWithChildren<object>) => {
    const [ posts, setPosts ] = useState<Post[]>([]);

    const authContext = useContext(AuthContext);

    if(!authContext){
        throw new Error('Error al cargar authContext en PostProvider');
    };
    const { token } = authContext;

    useEffect(()=>{
        const getVisiblePosts = async () => {
            const response = await protectedServices.getAllVisiblePosts(token);
            const data = response.data;
            console.log('data',data);
        };
        getVisiblePosts();
    },[ token ]);

    const createPost = () => {

    };

    return(
        <PostContext.Provider value={{ posts, createPost }}>
            {children}
        </PostContext.Provider>
    );
};