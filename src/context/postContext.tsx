import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from 'react';
import { PostResponse, User } from '../types/types';
import protectedServices from '../services/protected';
import { throttle } from 'lodash';
import { useAuth } from './authContext';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

export type PostContextType = {
    visiblePosts: PostResponse[];
    postsFromLoggedUser: PostResponse[];
    users: User[];
    getVisiblePostsFromUser: (username: string) => Promise<PostResponse[]>;
    getUser: (username: string) => Promise<User>;
    createPost: (data: FormData) => void;
    createLike: (postId: number) => void;
    refreshVisiblePosts: () => void;
    deletePostById: (id: number) => Promise<void>
};

// eslint-disable-next-line react-refresh/only-export-components
export const PostContext = createContext<PostContextType| null>(null);

export const PostProvider = ({ children }: { children: ReactNode }) => {

    const [ postsFromLoggedUser, setPostsFromLoggedUser ] = useState<PostResponse[]>([]); // Guarda todos los post del usuario loggeado
    const [ visiblePosts, setVisiblePosts ] = useState<PostResponse[]>([]); // Guarda todos los posts visibles
    const [ users, setUsers ] = useState<User[]>([]); // lo utilizo en el componente Search para buscar los usuarios

    const { token } = useAuth();

    useEffect(()=>{
        if(!token) return;
        const getPostsFromLoggedUser = async () => {
            if(postsFromLoggedUser.length === 0) { // Consulta solo si aún no se ha cargado
                const response = await protectedServices.getAllPostsFromLoggedUser(token);
                const data = response.data;
                setPostsFromLoggedUser(data);
            }
        };

        const getVisiblePosts = async () => {
            if(visiblePosts.length === 0) { // Consulta solo si aún no se ha cargado
                const response = await protectedServices.getAllVisiblePosts(token);
                const data = response.data;
                setVisiblePosts(data);
            }
        };

        const getAllUsers = async () => {
            if(users.length === 0) { // Consulta solo si aún no se ha cargado
                const response = await protectedServices.getAllUsers(token);
                const data = response.data;
                setUsers(data);
            }
        };

        getVisiblePosts();
        getPostsFromLoggedUser();
        getAllUsers();
    }, [ token ]);

    const createPost = async (data: FormData) => {
        try{
            const newPost = await protectedServices.createPost(token, data);

            const postData = newPost.data;
            const newVisiblePosts = [ postData,...visiblePosts ];
            setVisiblePosts(newVisiblePosts);
            const newPostsFromLoggedUser = [ postData, ...postsFromLoggedUser ];
            setPostsFromLoggedUser(newPostsFromLoggedUser);
            toast.success('Post created successfully!');

        } catch(error){
            if (error instanceof AxiosError && error.response?.data?.message) {
                toast.error(error.response.data.message || 'An unexpected error occurred.');
            } else {
                toast.error('An unexpected error occurred.');
            }
        }
    };

    const createLike = async (postId: number) => {
        try {
            // Optimistic update (actualiza antes de esperar la respuesta)
            const newVisiblePosts = visiblePosts.map(post => {
                if (post.id === postId) {
                    return {
                        ...post,
                        likesCount: post.hasLiked ? post.likesCount - 1 : post.likesCount + 1,
                        hasLiked: !post.hasLiked, // Cambia el estado de like inmediatamente
                    };
                }
                return post;
            });
            setVisiblePosts(newVisiblePosts);

            // Esperar la respuesta del servidor
            const likeResponse = await protectedServices.createLike(token, postId);

            // Si la respuesta es incorrecta, revertir el cambio
            if (![ 201, 204 ].includes(likeResponse.status)) {
                throw new Error('Failed to update like status');
            }
        } catch (error) {
            // Revertir el cambio en caso de error
            const revertedPosts = visiblePosts.map(post => {
                if (post.id === postId) {
                    return {
                        ...post,
                        likesCount: post.hasLiked ? post.likesCount + 1 : post.likesCount - 1,
                        hasLiked: !post.hasLiked, // Revierte el cambio de like
                    };
                }
                return post;
            });
            setVisiblePosts(revertedPosts);

            if (error instanceof AxiosError && error.response?.data?.message) {
                throw new Error(error.response.data.message || 'An unexpected error occurred.');
            } else {
                throw new Error('An unexpected error occurred.');
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

    const getUser = async (username: string) => {
        try{
            const response = await protectedServices.getUser(token, username);
            return response.data;
        }catch(error){
            if (error instanceof AxiosError && error.response?.data?.message) {
                throw new Error(error.response.data.message || 'An unexpected error occurred.');
            } else {
                throw new Error('An unexpected error occurred.');
            }
        }
    };

    const throttledRefresh = throttle(async (token: string | null) => {
        try {
            const responseVisiblePosts = await protectedServices.getAllVisiblePosts(token);
            const dataVisiblePosts = responseVisiblePosts.data;
            setVisiblePosts(dataVisiblePosts);
            const responsePostFromLoggedUser = await protectedServices.getAllPostsFromLoggedUser(token);
            const dataPostFromLoggedUser = responsePostFromLoggedUser.data;
            setPostsFromLoggedUser(dataPostFromLoggedUser);
        } catch (error) {
            if (error instanceof AxiosError && error.response?.data?.message) {
                throw new Error(error.response.data.message || 'An unexpected error occurred.');
            } else {
                throw new Error('An unexpected error occurred.');
            }
        }
    }, 30000); // Solo se puede consultar cada 30 segundos

    // useCallback se utiliza para memorizar una función y evitar que se recree
    // en cada renderizado del componente, a menos que cambie alguna de sus dependencias.
    // En este caso, refreshVisiblePosts solo se recreará si cambia el token.
    // Esto mejora el rendimiento al evitar que se creen nuevas funciones throttled innecesariamente.

    // Sin este useCallback lo que pasaba antes es que al clickear instagramDemake(el logo) igual se hacia la petición al backend
    const refreshVisiblePosts = useCallback(() => {
        throttledRefresh(token);
    }, [ token ]);

    const deletePostById = async (id: number)=>{
        try{
            await protectedServices.deletePostById(token, id);
            const newPostsFromLoggedUser = postsFromLoggedUser.filter(post => post.id !== id);
            setPostsFromLoggedUser(newPostsFromLoggedUser);
            const newVisiblePosts = visiblePosts.filter(post => post.id !== id);
            setVisiblePosts(newVisiblePosts);

            toast.success('post deleted successfully');
        }catch(error){
            if (error instanceof AxiosError && error.response?.data?.message) {
                toast.error(error.response.data.message || 'An unexpected error occurred.');
            } else {
                toast.error('An unexpected error occurred.');
            }
        }
    };

    // Si no hay token, no renderiza el provider, pero los hooks ya fueron llamados
    if (!token) {
        return null;
    }

    return(
        <PostContext.Provider
            value = {{
                visiblePosts,
                postsFromLoggedUser,
                users,
                getVisiblePostsFromUser,
                getUser,
                createPost,
                createLike,
                refreshVisiblePosts,
                deletePostById
            }}>
            {children}
        </PostContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const usePost = () => {
    const context = useContext(PostContext);
    if(!context){
        throw new Error('usePost must be used within a PostProvider');
    }
    return context;
};