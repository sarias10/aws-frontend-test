import { Box, Typography, Button, TextField, IconButton } from '@mui/material';
import Modal from '@mui/material/Modal';
import { ChangeEvent, useEffect, useState } from 'react';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import { toast } from 'react-toastify';

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
    const [ files, setFiles ] = useState<File[] | null>(null);
    const [ currentIndex, setCurrentIndex ] = useState(0);

    const handleFilesChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            setFiles(Array.from(files));
            setCurrentIndex(0); // Reinicia el índice al seleccionar nuevos archivos
        }
    };

    const handleDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
        setDescription(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!files || files.length === 0) {
            toast.error('Please select at least one file.');
            return;
        }

        const formData = new FormData();
        formData.append('description', description);

        Array.from(files).forEach(file => {
            formData.append('files', file);
        });

        console.log('Formulario enviado', { description, files });

        toast.success('Post created successfully!');
        setDescription('');
        setFiles(null);
        onClose();
    };

    const handleNext = () => {
        if (files && currentIndex < files.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const handlePrevious = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    // Ejecuta lógica después de renderizar: Cuando el componente se renderiza, el código dentro del useEffect se ejecuta.
    useEffect(() => {
        if (!open) {
            setDescription('');
            setFiles([]);
            setCurrentIndex(0);
        }
    }, [ open ]); // Cuando open cambia, vuelve a disparar el efecto

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
                        accept="image/*"
                        /*,video/**/
                        onChange={handleFilesChange}
                    />
                </Button>

                {files && files.length > 0 && (
                    <div style={{ marginTop: '20px', textAlign: 'center' }}>
                        <Typography variant="body1">Preview:</Typography>
                        <div style={{ position: 'relative', marginTop: '10px' }}>
                            {files[currentIndex].type.startsWith('image/') ? (
                                <img
                                    src={URL.createObjectURL(files[currentIndex])}
                                    alt={files[currentIndex].name}
                                    style={{ maxWidth: '100%', maxHeight: '300px', borderRadius: '8px' }}
                                />
                            ) : (
                                <video
                                    src={URL.createObjectURL(files[currentIndex])}
                                    controls
                                    style={{ maxWidth: '100%', maxHeight: '300px', borderRadius: '8px' }}
                                />
                            )}

                            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                                <IconButton onClick={handlePrevious} disabled={currentIndex === 0}>
                                    <ArrowBack />
                                </IconButton>
                                <IconButton onClick={handleNext} disabled={currentIndex === files.length - 1}>
                                    <ArrowForward />
                                </IconButton>
                            </div>
                        </div>
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
