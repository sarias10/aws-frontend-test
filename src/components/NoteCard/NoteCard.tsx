import { NoteProp } from '../../types/types';

export const NoteCard = ({ note }: NoteProp) => {
    return (
        <div>
            <h3>{note.title}</h3>
            <div>{note.content}</div>
        </div>
    );
};
