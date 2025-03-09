import { NoteProps } from '../../types/types';

export const NoteCard = ({ note }: NoteProps) => {
    return (
        <div>
            <h3>{note.title}</h3>
            <div>{note.content}</div>
        </div>
    );
};
