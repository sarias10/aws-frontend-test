// import { FC, FormEvent, useContext, useState } from 'react';
// import { NoteContext } from '../../context/noteContext';
// import { Note, NoteContextType } from '../../types/types';

// export const AddNote: FC = () => {
//     const { saveNote } = useContext(NoteContext) as NoteContextType;
//     const [ formData, setFormData ] = useState<Note>({} as Note);
//     const handleForm = (e: FormEvent<HTMLInputElement>): void => {
//         setFormData({
//             ...formData,
//             [e.currentTarget.id]: e.currentTarget.value,
//         });
//     };
//     const handleSaveNote = (e: FormEvent, formData: Note) => {
//         e.preventDefault();
//         saveNote(formData);
//     };
//     return (
//         <form className='Form' onSubmit={(e) => handleSaveNote(e, formData)}>

//         </form>
//     );
// };
