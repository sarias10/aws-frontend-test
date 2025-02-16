const envVariables = import.meta.env;

export const config = {
    api_url_notes: envVariables.VITE_API_URL_NOTES,
    mode: envVariables.MODE
}