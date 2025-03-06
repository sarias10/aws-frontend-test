import axios from 'axios';
import { config } from '../config/env';
import { SignUpFormState } from '../types/types';
const baseUrl = `${config.api_url}/api/public`;

const signUp = async (data: SignUpFormState) => {
    const url = `${baseUrl}/register`;
    const response = await axios.post(url, data);
    return response.data;
};

const getAllPublicNotes = async () => {
    const url = `${baseUrl}/visible-notes`;
    const response = await axios.get(url);
    return response.data;
};

export default {
    getAllPublicNotes,
    signUp
};