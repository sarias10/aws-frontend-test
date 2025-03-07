import { useContext } from 'react';
import { NoteContext } from '../../context/noteContext';
import { Note } from '../../types/types';
import { NoteCard } from '../NoteCard/NoteCard';

export const NotesContainer = () => {
    const noteContext = useContext(NoteContext);
    if (!noteContext) {
        throw new Error('');
    }
    const { notes } = noteContext;
    return (
        <>
            <h1>Public notes</h1>
            <ul>
                {notes.map((note: Note) => (
                    <li key={note.id}>
                        <NoteCard  note={note} />
                    </li>
                ))
                }
            </ul>
        </>
    );
};
