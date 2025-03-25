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
    commentsCount: number,
    author: Author,
    media: Media[]
}
export interface PostsResponseProps {
    posts: PostResponse[]
}
export interface PostResponseProps {
    post: PostResponse
}

export interface User {
    id: number,
    username: string,
    name: string,
    visible: boolean,
}

export interface SignupType {
    username: string;
    name: string;
    password: string;
};

export interface LoginType {
    username: string;
    password: string;
};