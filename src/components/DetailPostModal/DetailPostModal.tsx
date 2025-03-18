import { Box, Modal } from '@mui/material';
import { useModal } from '../../context/modalContext';

export const DetailPostModal = () => {
    const { open, handleClose } = useModal();
    return (
        <Modal
            open={open}
            onClose={handleClose}
        >
            <Box>
                <h1>DetailPostModal</h1>
            </Box>
        </Modal>

    );
};
