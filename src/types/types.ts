export interface Note {
    id: number;
    title: string;
    content: string;
    visible?: boolean;
    userId: number;
    createdAt?: string; // ISO string de fecha
    updatedAt?: string; // ISO string de fecha
};

export type NoteCreationAttributes = Omit<Note, 'id' | 'createdAt' | 'updatedAt'>;

export type NoteContextType = {
    notes: Note[];
    saveNote: (todo: Note) => void;
};

export interface NoteProp {
    note: Note;
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