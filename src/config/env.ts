const envVariables = import.meta.env;

export const config = {
    api_url: envVariables.VITE_API_URL,
    mode: envVariables.MODE
};