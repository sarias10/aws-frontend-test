import { useContext } from 'react';
import { NoteContext } from '../../context/noteContext';
import { Note } from '../../types/types';
import { NoteCard } from '../../components/NoteCard/NoteCard';

export const NotesByUser = () => {
    const noteContext = useContext(NoteContext);
    if (!noteContext) {
        throw new Error('');
    }
    const { notesByUser } = noteContext;
    return (
        <>
            <h2>Your tweets</h2>
            <br/>
            {notesByUser && (
                <ul>
                    {notesByUser.map((note: Note) => (
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
