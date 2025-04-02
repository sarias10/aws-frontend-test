import axios from 'axios';
import { config } from '../config/env';

const baseUrl = `${config.api_url}/api/protected`;

const getAllPostsFromLoggedUser = async (token: string | null) => {
    const config = {
        headers: { Authorization: token }
    };
    const url = `${baseUrl}/get-all-posts-from-logged-user`;
    const response = await axios.get(url, config);
    return response;
};

const getAllVisiblePosts = async (token: string | null) => {
    const config = {
        headers: { Authorization: token }
    };
    const url = `${baseUrl}/get-all-visible-posts`;
    const response = await axios.get(url, config);
    return response;
};

const getAllVisiblePostsFromUser = async (token: string | null, username: string) => {
    const config = {
        headers: { Authorization: token }
    };
    const url = `${baseUrl}/get-all-visible-posts-from-user/${username}`;
    const response = await axios.get(url, config);
    return response;
};

const createPost = async (token: string | null, data: FormData) => {
    const config = {
        headers: { Authorization: token }
    };
    const url = `${baseUrl}/create-post`;
    const response = await axios.post(url, data, config);
    return response;
};

const createComment = async (token: string | null, data: { content: string; postId: number }) => {
    const config = {
        headers: { Authorization: token }
    };
    const url = `${baseUrl}/create-comment`;
    const response = await axios.post(url, data, config);
    return response;
};

const getCommentsByPostId = async (token: string | null, postId: number) => {
    const config = {
        headers: { Authorization: token }
    };
    const url = `${baseUrl}/get-comments-by-post-id/${postId}`;
    const response = await axios.get(url, config);
    return response;
};

const createLike = async (token: string | null, postId: number) => {
    const config = {
        headers: { Authorization: token }
    };
    const data = {
        postId: postId,
    };
    const url = `${baseUrl}/create-like`;
    const response = await axios.post(url, data, config);
    return response;
};

const getAllUsers = async (token: string| null) => {
    const config = {
        headers: { Authorization: token }
    };
    const url = `${baseUrl}/get-all-users`;
    const response = await axios.get(url, config);
    return response;
};

const getUser = async (token: string | null, username: string) => {
    const config = {
        headers: { Authorization: token }
    };
    const url = `${baseUrl}/get-user/${username}`;
    const response = await axios.get(url, config);
    return response;
};

const deletePostById = async (token: string | null, id: number) => {
    const config = {
        headers: { Authorization: token }
    };
    const url = `${baseUrl}/deletePostById/${id}`;
    const response = await axios.delete(url, config);
    return response;
};

export default {
    getAllPostsFromLoggedUser,
    getAllVisiblePosts,
    getAllVisiblePostsFromUser,
    createPost,
    createComment,
    getCommentsByPostId,
    createLike,
    getAllUsers,
    getUser,
    deletePostById
};
