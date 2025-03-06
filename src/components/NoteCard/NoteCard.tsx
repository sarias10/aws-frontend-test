import { NoteProp } from '../../types/types';

export const NoteCard = ({ note }: NoteProp) => {
    return (
        <div>
            <h1>{note.title}</h1>
            <div>{note.content}</div>
        </div>
    );
};
