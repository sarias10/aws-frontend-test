import { Box, Typography, Button, TextField } from '@mui/material';
import Modal from '@mui/material/Modal';
import { ChangeEvent, useState } from 'react';

const style = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

interface CreatePostModalProps {
    open: boolean;
    onClose: () => void;
}

export const CreatePostModal = ({ open, onClose }: CreatePostModalProps) => {
    const [ description, setDescription ] = useState('');
    const [ files, setFiles ] = useState<File[]| null>(null);

    const handleFilesChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if(files){
            setFiles(Array.from(files));
        }
    };

    const handleDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
        setDescription(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!files) {
            alert('Please select at least one file.');
            return;
        }

        const formData = new FormData();
        formData.append('description', description);

        Array.from(files).forEach(file => {
            formData.append('files', file);
        });

        // Aquí deberías hacer la petición a tu backend usando fetch o axios, por ejemplo.
        console.log('Formulario enviado');
        console.log({ description, files });

        // Reiniciamos el formulario
        setDescription('');
        setFiles(null);
        onClose();
    };

    console.log(files);
    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="create-post-modal-title"
            aria-describedby="create-post-modal-description"
        >
            <Box component="form" onSubmit={handleSubmit} sx={style}>
                <Typography id="create-post-modal-title" variant="h6" component="h2">
                    Create New Post
                </Typography>

                <Button
                    variant="contained"
                    component="label"
                    fullWidth
                    sx={{ mt: 2 }}
                >
                    Upload Files
                    <input
                        type="file"
                        hidden
                        multiple
                        onChange={handleFilesChange}
                    />
                </Button>

                {files &&files.length > 0 && (
                    <div style={{ marginTop: '20px' }}>
                        <Typography variant="body1">Selected files:</Typography>
                        <ul>
                            {files.map((file, index) => (
                                <li key={index}>
                                    {file.type.startsWith('image/') ? (
                                        <img
                                            src={URL.createObjectURL(file)}
                                            alt={file.name}
                                            width="100"
                                            style={{ marginBottom: '10px', borderRadius: '8px' }}
                                        />
                                    ) : (
                                        <video
                                            src={URL.createObjectURL(file)}
                                            width="150"
                                            controls
                                            style={{ marginBottom: '10px', borderRadius: '8px' }}
                                        />
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                <TextField
                    label="Description"
                    fullWidth
                    margin="normal"
                    value={description}
                    onChange={handleDescriptionChange}
                />

                <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    sx={{ mt: 3 }}
                >
                    Submit
                </Button>
            </Box>
        </Modal>
    );
};