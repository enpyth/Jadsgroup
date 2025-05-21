import { Button, Box } from '@mui/material';
import { Save } from 'lucide-react';

type SaveButtonProps = {
    onSave: () => void;
};

export function SaveButton({ onSave }: SaveButtonProps) {
    return (
        <Box
            sx={{
                position: 'fixed',
                bottom: 0,
                left: 0,
                right: 0,
                bgcolor: 'background.paper',
                borderTop: 1,
                borderColor: 'divider',
                p: 2,
                zIndex: 1000,
            }}
        >
            <Box sx={{ maxWidth: 'lg', mx: 'auto', display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<Save size={20} />}
                    onClick={onSave}
                    size="large"
                >
                    Save Changes
                </Button>
            </Box>
        </Box>
    );
} 