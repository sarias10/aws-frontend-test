import axios from 'axios';
import { config } from '../config/env';
import { LoginType, SignUpFormState } from '../types/types';
const baseUrl = `${config.api_url}/api/public`;

const signUp = async (data: SignUpFormState) => {
    const url = `${baseUrl}/register`;
    const response = await axios.post(url, data);
    return response.data;
};

const login = async (data: LoginType) => {
    const url = `${baseUrl}/login`;
    const response = await axios.post(url, data);
    return response;
};

const getAllPublicNotes = async () => {
    const url = `${baseUrl}/visible-notes`;
    const response = await axios.get(url);
    return response.data;
};

export default {
    getAllPublicNotes,
    signUp,
    login
};