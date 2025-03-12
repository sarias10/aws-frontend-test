export interface Post{
    id?: number;
    title: string;
    content: string;
};

export interface PostProps {
    post: Post;
};

export type PostContextType = {
    posts: Post[];
    createPost: (todo: Post) => void;
};

export interface SignUpFormState {
    username: string;
    name: string;
    password: string;
};

export interface LoginType {
    username: string;
    password: string;
};

export interface AuthProviderProps {
    username: string | null,
    name: string | null,
    token: string | null,
    login (data: LoginType): void,
    logout(): void,
};