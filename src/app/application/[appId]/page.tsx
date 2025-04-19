'use client'
import { redirect } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import {
    TextField,
    Checkbox,
    FormControlLabel,
    Button,
    Container,
    Typography,
    Paper,
    Box,
    InputAdornment
} from '@mui/material';
import Grid from '@mui/material/Grid2'
import { Product as Property } from '@/constants/data';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Dayjs } from 'dayjs';

export default function Page() {
    const { data: session, status } = useSession();
    const params = useParams();
    const [property, setProperty] = useState<Property | null>(null);
    const [formData, setFormData] = useState({
        agreement: false,
        rent_amount: '',
        deposit_amount: '',
        start_date: null as Dayjs | null,
        end_date: null as Dayjs | null,
    });

    useEffect(() => {
        if (status === 'unauthenticated') {
            redirect('/login');
        }
    }, [status]);

    useEffect(() => {
        const fetchProperty = async () => {
            const response = await fetch(`/api/properties/${params.appId}`);
            if (response.ok) {
                const data = await response.json();
                setProperty(data[0]);
                // Update form data with property price when available
                setFormData(prev => ({
                    ...prev,
                    rent_amount: data[0].price || '',
                    deposit_amount: (data[0].price / 10).toString() || ''
                }));
            }
        };
        fetchProperty();
    }, [params.appId]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleDateChange = (field: 'start_date' | 'end_date') => (newValue: Dayjs | null) => {
        setFormData(prev => ({
            ...prev,
            [field]: newValue
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // 添加租约到数据库通过 API
        const response = await fetch('/api/leases', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                property_id: params.appId,
                tenant_email: session?.user?.email,
                start_date: formData.start_date?.toDate(),
                end_date: formData.end_date?.toDate(),
                rent_amount: formData.rent_amount,
                deposit_amount: formData.deposit_amount,
                stage: 'Review Application',
                agreement_to_lease: formData.agreement ? 'Yes' : 'No',
            }),
        });

        if (response.ok) {
            redirect('/dashboard/lease');
        } else {
            console.error('Failed to add lease:', response.status, response.statusText);
            const errorText = await response.text(); // 获取详细错误信息
            console.error('Error response:', errorText);
        }
    };

    return (
        <Container maxWidth="md">
            <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Rental Application Form
                </Typography>

                {property && (
                    <Box mb={4}>
                        <Typography variant="h6" gutterBottom>
                            Property Information
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid size={12}>
                                <Typography>
                                    <strong>Address:</strong> {property.name}
                                </Typography>
                            </Grid>
                            <Grid size={12}>
                                <Typography>
                                    <strong>Description:</strong> {property.description}
                                </Typography>
                            </Grid>
                            <Grid size={12}>
                                <Typography>
                                    <strong>Description:</strong> {property.price}
                                </Typography>
                            </Grid>
                            <Grid size={12}>
                                <Typography>
                                    <strong>Description:</strong> {property.release_time}
                                </Typography>
                            </Grid>
                            <Grid size={12}>
                                <Typography>
                                    <strong>Description:</strong> {property.size}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>
                )}

                <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid size={12}>
                            <TextField
                                disabled
                                fullWidth
                                label="Rent Amount"
                                name="rent_amount"
                                value={formData.rent_amount}
                                onChange={handleChange}
                                slotProps={{
                                    input: {
                                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                    },
                                }}
                            />
                        </Grid>
                        <Grid size={12}>
                            <TextField
                                disabled
                                fullWidth
                                label="Deposit Amount"
                                name="deposit_amount"
                                value={formData.deposit_amount}
                                onChange={handleChange}
                                slotProps={{
                                    input: {
                                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                    },
                                }}
                            />
                        </Grid>
                        <Grid size={12}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker 
                                    label="Start Date"
                                    value={formData.start_date}
                                    onChange={handleDateChange('start_date')}
                                    slotProps={{ textField: { fullWidth: true } }}
                                />
                            </LocalizationProvider>
                        </Grid>
                        <Grid size={12}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker 
                                    label="End Date"
                                    value={formData.end_date}
                                    onChange={handleDateChange('end_date')}
                                    slotProps={{ textField: { fullWidth: true } }}
                                />
                            </LocalizationProvider>
                        </Grid>
                        <Grid size={12}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={formData.agreement}
                                        onChange={handleChange}
                                        name="agreement"
                                    />
                                }
                                label="I agree to the rental agreement"
                            />
                        </Grid>
                        <Grid size={12}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                                size="large"
                            >
                                Submit Application
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
}

