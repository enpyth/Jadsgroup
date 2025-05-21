"use client";

import { type InferSelectModel } from "drizzle-orm";
import { outgoings } from "@/db/schema";
import { useState } from "react";
import { Container, Typography, Box } from '@mui/material';
import { AddCategoryForm } from './components/AddCategoryForm';
import { CategoryHeader } from './components/CategoryHeader';
import { ItemsTable } from './components/ItemsTable';
import { SaveButton } from './components/SaveButton';

type OutgoingData = InferSelectModel<typeof outgoings>;

type PageProps = {
    outgoingData: OutgoingData;
};

type RecordItem = {
    gst: string;
    name: string;
    total: string;
    amount: string;
    supplier: string;
};

type Record = {
    name: string;
    items: RecordItem[];
};


export default function OutgoingDetailPage({ outgoingData }: PageProps) {
    const [records, setRecords] = useState<Record[]>(outgoingData.records as Record[]);
    const [isEditing, setIsEditing] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState("");

    const handleItemChange = (categoryIndex: number, itemIndex: number, field: keyof RecordItem, value: string) => {
        const newRecords = [...records];
        newRecords[categoryIndex].items[itemIndex][field] = value;
        setRecords(newRecords);
        setIsEditing(true);
    };

    const addNewCategory = () => {
        if (!newCategoryName.trim()) return;
        setRecords([...records, { name: newCategoryName, items: [] }]);
        setNewCategoryName("");
        setIsEditing(true);
    };

    const deleteCategory = (categoryIndex: number) => {
        const newRecords = records.filter((_, index) => index !== categoryIndex);
        setRecords(newRecords);
        setIsEditing(true);
    };

    const addNewItem = (categoryIndex: number) => {
        const newRecords = [...records];
        newRecords[categoryIndex].items.push({
            name: "",
            supplier: "",
            amount: "0",
            gst: "0",
            total: "0"
        });
        setRecords(newRecords);
        setIsEditing(true);
    };

    const deleteItem = (categoryIndex: number, itemIndex: number) => {
        const newRecords = [...records];
        newRecords[categoryIndex].items = newRecords[categoryIndex].items.filter((_, index) => index !== itemIndex);
        setRecords(newRecords);
        setIsEditing(true);
    };

    const handleSubmit = async () => {
        try {
            const response = await fetch(`/api/outgoings/${outgoingData.lease_id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ records }),
            });

            if (!response.ok) {
                throw new Error('Failed to save changes');
            }

            setIsEditing(false);
            alert('Changes saved successfully!');
        } catch (error) {
            console.error('Failed to save changes:', error);
            alert('Failed to save changes. Please try again.');
        }
    };

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Outgoing Details - Lease ID: {outgoingData.lease_id}
            </Typography>

            <AddCategoryForm
                newCategoryName={newCategoryName}
                onCategoryNameChange={setNewCategoryName}
                onAddCategory={addNewCategory}
            />

            <Box sx={{ mb: 4 }}>
                {records.map((category, categoryIndex) => (
                    <Box key={category.name} sx={{ mb: 4 }}>
                        <CategoryHeader
                            categoryName={category.name}
                            onAddItem={() => addNewItem(categoryIndex)}
                            onDeleteCategory={() => deleteCategory(categoryIndex)}
                        />
                        <ItemsTable
                            items={category.items}
                            onItemChange={(itemIndex, field, value) => 
                                handleItemChange(categoryIndex, itemIndex, field, value)
                            }
                            onDeleteItem={(itemIndex) => deleteItem(categoryIndex, itemIndex)}
                        />
                    </Box>
                ))}
            </Box>

            {isEditing && <SaveButton onSave={handleSubmit} />}
        </Container>
    );
}