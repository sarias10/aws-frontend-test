import axios from 'axios';
import { config } from '../config/env';
import { Post } from '../types/types';

const baseUrl = `${config.api_url}/api/protected`;

const getAllPostsFromLoggedUser = async (token: string | null) => {
    const config = {
        headers: { Authorization: token }
    };
    const url = `${baseUrl}/get-all-notes-by-user`;
    const response = await axios.get(url, config);
    return response;
};

const getAllVisiblePosts = async (token: string | null) => {
    const config = {
        headers: { Authorization: token }
    };
    const url = `${baseUrl}/get-all-notes-by-user`;
    const response = await axios.get(url, config);
    return response;
};

const getAllVisiblePostsFromUser = async (token: string | null) => {
    const config = {
        headers: { Authorization: token }
    };
    const url = `${baseUrl}/get-all-notes-by-user`;
    const response = await axios.get(url, config);
    return response;
};

const createPost = async (token: string | null, data: Post) => {
    const config = {
        headers: { Authorization: token }
    };
    const url = `${baseUrl}/create-note`;
    const response = await axios.post(url, data, config);
    return response;
};

const createComment = async (token: string | null) => {
    const config = {
        headers: { Authorization: token }
    };
    const url = `${baseUrl}/get-all-notes-by-user`;
    const response = await axios.get(url, config);
    return response;
};

const createLike = async (token: string | null) => {
    const config = {
        headers: { Authorization: token }
    };
    const url = `${baseUrl}/get-all-notes-by-user`;
    const response = await axios.get(url, config);
    return response;
};

export default {
    getAllPostsFromLoggedUser,
    getAllVisiblePosts,
    getAllVisiblePostsFromUser,
    createPost,
    createComment,
    createLike
};
