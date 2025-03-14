export interface Author {
    id:number,
    username: string
}
export interface Media {
    id: number,
    mediaUrl: string,
    mediaType: string
}
export interface Comment {
    id: number,
    content: string,
    author: Author
}
export interface PostResponse {
    id: number,
    description: string,
    likesCount: number,
    author: Author,
    media: Media[],
    comments: Comment[]
}

export interface PostResponseProps {
    post: PostResponse
}
export interface PostCreationAttributes{
    id?: number;
    description: string
};

export type PostContextType = {
    visiblePosts: PostResponse[];
    createPost: (todo: PostCreationAttributes) => void;
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