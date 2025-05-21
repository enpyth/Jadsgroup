import { Box, Typography, Button } from '@mui/material';
import { Plus, Trash2 } from 'lucide-react';

type CategoryHeaderProps = {
    categoryName: string;
    onAddItem: () => void;
    onDeleteCategory: () => void;
};

export function CategoryHeader({ categoryName, onAddItem, onDeleteCategory }: CategoryHeaderProps) {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h6" component="h2">
                {categoryName}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<Plus size={18} />}
                    onClick={onAddItem}
                    size="small"
                >
                    Add Item
                </Button>
                <Button
                    variant="outlined"
                    color="error"
                    startIcon={<Trash2 size={18} />}
                    onClick={onDeleteCategory}
                    size="small"
                >
                    Delete Category
                </Button>
            </Box>
        </Box>
    );
} 