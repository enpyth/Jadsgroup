import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TextField,
    IconButton,
} from '@mui/material';
import { Trash2 } from 'lucide-react';

type RecordItem = {
    gst: string;
    name: string;
    total: string;
    amount: string;
    supplier: string;
};

type ItemsTableProps = {
    items: RecordItem[];
    onItemChange: (itemIndex: number, field: keyof RecordItem, value: string) => void;
    onDeleteItem: (itemIndex: number) => void;
};

export function ItemsTable({ items, onItemChange, onDeleteItem }: ItemsTableProps) {
    return (
        <TableContainer component={Paper} sx={{ mb: 4 }}>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Supplier</TableCell>
                        <TableCell>Amount</TableCell>
                        <TableCell>GST</TableCell>
                        <TableCell>Total</TableCell>
                        <TableCell align="right">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {items.map((item, itemIndex) => (
                        <TableRow key={itemIndex} hover>
                            <TableCell>
                                <TextField
                                    fullWidth
                                    value={item.name}
                                    onChange={(e) => onItemChange(itemIndex, 'name', e.target.value)}
                                    size="small"
                                    variant="standard"
                                />
                            </TableCell>
                            <TableCell>
                                <TextField
                                    fullWidth
                                    value={item.supplier}
                                    onChange={(e) => onItemChange(itemIndex, 'supplier', e.target.value)}
                                    size="small"
                                    variant="standard"
                                />
                            </TableCell>
                            <TableCell>
                                <TextField
                                    fullWidth
                                    type="number"
                                    value={item.amount}
                                    onChange={(e) => onItemChange(itemIndex, 'amount', e.target.value)}
                                    size="small"
                                    variant="standard"
                                />
                            </TableCell>
                            <TableCell>
                                <TextField
                                    fullWidth
                                    type="number"
                                    value={item.gst}
                                    onChange={(e) => onItemChange(itemIndex, 'gst', e.target.value)}
                                    size="small"
                                    variant="standard"
                                />
                            </TableCell>
                            <TableCell>
                                <TextField
                                    fullWidth
                                    type="number"
                                    value={item.total}
                                    onChange={(e) => onItemChange(itemIndex, 'total', e.target.value)}
                                    size="small"
                                    variant="standard"
                                />
                            </TableCell>
                            <TableCell align="right">
                                <IconButton
                                    color="error"
                                    onClick={() => onDeleteItem(itemIndex)}
                                    size="small"
                                >
                                    <Trash2 size={18} />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
} 