import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import { PostContextType, PostResponse, User } from '../types/types';
import protectedServices from '../services/protected';

import { AuthContext } from './authContext';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
// eslint-disable-next-line react-refresh/only-export-components
export const PostContext = createContext<PostContextType| null>(null);

export const PostProvider = ({ children }: PropsWithChildren<object>) => {
    const [ postsFromLoggedUser, setPostsFromLoggedUser ] = useState<PostResponse[]>([]);
    const [ visiblePosts, setVisiblePosts ] = useState<PostResponse[]>([]);
    const [ users, setUsers ] = useState<User[]>([]);

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
        const getAllUsers = async () => {
            const response = await protectedServices.getAllUsers(token);
            const data = response.data;
            setUsers(data);
        };
        getVisiblePosts();
        getPostsFromLoggedUser();
        getAllUsers();
    },[ token ]);

    const createPost = async (data: FormData) => {
        try{
            await protectedServices.createPost(token, data);
            toast.success('Post created successfully!');

        } catch(error){
            if (error instanceof AxiosError && error.response?.data?.message) {
                toast.error(error.response.data.message || 'An unexpected error occurred.');
            } else {
                toast.error('An unexpected error occurred.');
            }
        }
    };

    const getVisiblePostsFromUser = async (username: string) => {
        try{
            const response = await protectedServices.getAllVisiblePostsFromUser(token, username);
            return response.data;
        }catch(error){
            if (error instanceof AxiosError && error.response?.data?.message) {
                throw new Error(error.response.data.message || 'An unexpected error occurred.');
            } else {
                throw new Error('An unexpected error occurred.');
            }
        }
    };
    return(
        <PostContext.Provider value={{ visiblePosts, postsFromLoggedUser, users, getVisiblePostsFromUser, createPost }}>
            {children}
        </PostContext.Provider>
    );
};