import { createContext, PropsWithChildren, useCallback, useContext, useEffect, useState } from 'react';
import { PostContextType, PostResponse, User } from '../types/types';
import protectedServices from '../services/protected';
import { throttle } from 'lodash';
import { AuthContext } from './authContext';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
// eslint-disable-next-line react-refresh/only-export-components
export const PostContext = createContext<PostContextType| null>(null);

export const PostProvider = ({ children }: PropsWithChildren<object>) => {
    const [ postsFromLoggedUser, setPostsFromLoggedUser ] = useState<PostResponse[]>([]);
    const [ visiblePosts, setVisiblePosts ] = useState<PostResponse[]>([]); // Guarda todos los posts visibles
    const [ users, setUsers ] = useState<User[]>([]);

    const authContext = useContext(AuthContext);

    if(!authContext){
        throw new Error('Error al cargar authContext en PostProvider');
    };

    const { token } = authContext;

    useEffect(()=>{
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
            const response = await protectedServices.getAllVisiblePosts(token);
            const data = response.data;
            setVisiblePosts(data);
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

    return(
        <PostContext.Provider value={{ visiblePosts, postsFromLoggedUser, users, getVisiblePostsFromUser, getUser, createPost, refreshVisiblePosts }}>
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
};