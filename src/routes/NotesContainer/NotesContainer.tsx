import { useContext } from 'react';
import { NoteContext } from '../../context/noteContext';
import { Note } from '../../types/types';
import { NoteCard } from '../../components/NoteCard/NoteCard';

export const NotesContainer = () => {
    const noteContext = useContext(NoteContext);
    if (!noteContext) {
        throw new Error('');
    }
    const { notes } = noteContext;
    return (
        <>
            <h2>Public twits</h2>
            <br/>
            {notes && (
                <ul>
                    {notes.map((note: Note) => (
                        <li key={note.id}>
                            <NoteCard  note={note} />
                        </li>
                    ))
                    }
                </ul>
            )}
        </>
    );
};
