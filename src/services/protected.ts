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

const getAllVisiblePostsFromUser = async (token: string | null) => {
    return;
};

const createPost = async (token: string | null, data: Post) => {
    return;
};

const createComment = async (token: string | null) => {
    return;
};

const createLike = async (token: string | null) => {
    return;
};

export default {
    getAllPostsFromLoggedUser,
    getAllVisiblePosts,
    getAllVisiblePostsFromUser,
    createPost,
    createComment,
    createLike
};
