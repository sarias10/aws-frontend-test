import axios from 'axios';
import { config } from '../config/env';
const baseUrl = `${config.api_url}/api/public`;

const getAllPublicNotes = async () =>{
    const url = `${baseUrl}/visible-notes`;
    const response = await axios.get(url);
    return response.data;
};

export default {
    getAllPublicNotes
};