import axios from 'axios';
import { config } from '../config/env';
import { Note } from '../types/types';

const baseUrl = `${config.api_url}/api/protected`;

const createNote = async (token: string | null, data: Note) => {
    const config = {
        headers: { Authorization: token }
    };
    const url = `${baseUrl}/create-note`;
    const response = await axios.post(url, data, config);
    return response;
};

const getNotesByUser = async (token: string | null) => {
    const config = {
        headers: { Authorization: token }
    };
    const url = `${baseUrl}/get-all-notes-by-user`;
    const response = await axios.get(url, config);
    return response;
};

export default {
    createNote,
    getNotesByUser
};
