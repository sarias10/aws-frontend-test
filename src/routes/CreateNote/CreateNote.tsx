import { ChangeEvent, useContext, useState } from 'react';
import { Note } from '../../types/types';
import { useNavigate } from 'react-router-dom';
import { NoteContext } from '../../context/noteContext';

export const CreateNote = () => {
    const [ formData, setFormData ] = useState<Note>({
        title: '',
        content: '',
    });
    const navigate = useNavigate();
    const noteContext = useContext(NoteContext);
    if(!noteContext){
        throw new Error('Error al cargar create twit');
    };
    const { createNote } = noteContext;
    const handleChange = (e: ChangeEvent<HTMLInputElement>)=>{
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };
    const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
        try{
            e.preventDefault();
            setFormData({
                title: '',
                content: '',
            });
            createNote(formData);
            navigate('/');
        }catch(error){
            console.error(error);
        }
    };
    return (
        <>
            <form onSubmit={handleSubmit}>
                <h1>Create tweet</h1>
                <div>
                    <label htmlFor='title'>Title:</label>
                    <input
                        type='text'
                        name='title'
                        id='title'
                        onChange={handleChange}
                        value={formData.title}
                        required
                        maxLength={40}
                    />
                </div>

                <div>
                    <label htmlFor='content'>Content:</label>
                    <input
                        type='text'
                        name='content'
                        id='content'
                        onChange={handleChange}
                        value={formData.content}
                        required
                        maxLength={40}
                    />
                </div>

                <button>Create Twit</button>
            </form>
        </>
    );
};
