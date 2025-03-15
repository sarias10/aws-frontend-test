import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import { PostContextType, PostResponse } from '../types/types';
import protectedServices from '../services/protected';

import { AuthContext } from './authContext';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
// eslint-disable-next-line react-refresh/only-export-components
export const PostContext = createContext<PostContextType| null>(null);

export const PostProvider = ({ children }: PropsWithChildren<object>) => {
    const [ postsFromLoggedUser, setPostsFromLoggedUser ] = useState<PostResponse[]>([]);
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
        const getPostsFromLoggedUser = async () => {
            const response = await protectedServices.getAllPostsFromLoggedUser(token);
            const data = response.data;
            setPostsFromLoggedUser(data);
        };
        getVisiblePosts();
        getPostsFromLoggedUser();
    },[ token ]);

    const createPost = async (data: FormData) => {
        try{
            const response = await protectedServices.createPost(token, data);
            toast.success('Post created successfully!');

        } catch(error){
            if (error instanceof AxiosError && error.response?.data?.message) {
                toast.error(error.response.data.message || 'An unexpected error occurred.');
            } else {
                toast.error('An unexpected error occurred.');
            }
        }
    };

    return(
        <PostContext.Provider value={{ visiblePosts, postsFromLoggedUser, createPost }}>
            {children}
        </PostContext.Provider>
    );
};