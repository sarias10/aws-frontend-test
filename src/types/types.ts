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