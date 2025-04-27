export const getImageUrl = (path: string) => {
    return new URL(`/public/assets/${path}`, import.meta.url).href;
};