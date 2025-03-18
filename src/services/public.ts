import axios from 'axios';
import { config } from '../config/env';
import { LoginType, SignupType } from '../types/types';
const baseUrl = `${config.api_url}/api/public`;

const signUp = async (data: SignupType) => {
    const url = `${baseUrl}/register`;
    const response = await axios.post(url, data);
    return response;
};

const login = async (data: LoginType) => {
    const url = `${baseUrl}/login`;
    const response = await axios.post(url, data);
    return response;
};

export default {
    signUp,
    login
};