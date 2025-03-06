import { createContext, PropsWithChildren, useEffect, useState } from 'react';
import { NoteContextType, Note } from '../types/types';
import publicServices from '../services/public';
// eslint-disable-next-line react-refresh/only-export-components
export const NoteContext = createContext<NoteContextType | null>(null);

export const NoteProvider = ({ children }: PropsWithChildren<object>) => {
    const [ notes, setNotes ] = useState<Note[]>([]);

    useEffect(()=>{
        const getNotes = async () => {
            const respone = await publicServices.getAllPublicNotes();
            setNotes(respone);
        };
        getNotes();
    },
    []);
    const saveNote = (note: Note) => {
        const newNote: Note = {
            id: Math.random(),
            title: note.title,
            content: note.content,
            visible: note.visible,
            userId: note.userId,
            createdAt: note.createdAt,
            updatedAt: note.updatedAt
        };
        setNotes([ ...notes, newNote ]);
    };

    return(
        <NoteContext.Provider value={{ notes, saveNote }}>
            {children}
        </NoteContext.Provider>
    );
};