import { TextField, Button, Box } from '@mui/material';
import { Plus } from 'lucide-react';

type AddCategoryFormProps = {
    newCategoryName: string;
    onCategoryNameChange: (name: string) => void;
    onAddCategory: () => void;
};

export function AddCategoryForm({ newCategoryName, onCategoryNameChange, onAddCategory }: AddCategoryFormProps) {
    return (
        <Box sx={{ mb: 4, display: 'flex', gap: 2 }}>
            <TextField
                fullWidth
                label="New Category Name"
                value={newCategoryName}
                onChange={(e) => onCategoryNameChange(e.target.value)}
                variant="outlined"
                size="small"
            />
            <Button
                variant="contained"
                color="primary"
                startIcon={<Plus size={20} />}
                onClick={onAddCategory}
                disabled={!newCategoryName.trim()}
            >
                Add Category
            </Button>
        </Box>
    );
} 