import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import { Note, NoteContextType } from '../types/types';
import publicServices from '../services/public';
import protectedServices from '../services/protected';

import { AuthContext } from './authContext';
// eslint-disable-next-line react-refresh/only-export-components
export const NoteContext = createContext<NoteContextType| null>(null);

export const NoteProvider = ({ children }: PropsWithChildren<object>) => {
    const [ notes, setNotes ] = useState<Note[]>([]);
    const [ notesByUser, setNotesByUser ] = useState<Note[]>([]);

    const authContext = useContext(AuthContext);

    if(!authContext){
        throw new Error('Error al cargar authContext en NoteProvider');
    };
    const { token } = authContext;

    useEffect(()=>{
        const getNotes = async () => {
            const response = await publicServices.getAllPublicNotes();
            setNotes(response);
        };
        getNotes();
    },
    []);

    useEffect(()=>{
        const getNotesByUser = async () => {
            const response = await protectedServices.getNotesByUser(token);
            setNotesByUser(response.data);
        };
        if (token){
            getNotesByUser();
        }
    },
    [ token, notes ]);

    const createNote = async (note: Note) => {
        const response = await protectedServices.createNote(token, note);
        console.log(response.data);
        const newNotes = [ ...notes, response.data ];
        setNotes(newNotes);
    };

    return(
        <NoteContext.Provider value={{ notes, notesByUser, createNote }}>
            {children}
        </NoteContext.Provider>
    );
};