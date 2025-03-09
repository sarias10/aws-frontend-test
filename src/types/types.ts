export interface Note{
    id?: number;
    title: string;
    content: string;
};

export interface NoteProps {
    note: Note;
};

export type NoteContextType = {
    notes: Note[];
    notesByUser: Note[];
    createNote: (todo: Note) => void;
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