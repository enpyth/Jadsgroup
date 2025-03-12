'use client'
import { redirect } from 'next/navigation';
import React, { useState } from 'react';

export default function page() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        agreement: false,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(formData);
        redirect('/dashboard/overview');
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Rental Application Form</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <label className="block">
                    Name:
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required className="border rounded p-2 w-full" />
                </label>
                <label className="block">
                    Email:
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required className="border rounded p-2 w-full" />
                </label>
                <label className="block">
                    <input type="checkbox" name="agreement" checked={formData.agreement} onChange={handleChange} />
                    I agree to the rental agreement
                </label>
                <button type="submit" className="bg-blue-500 text-white rounded p-2">Submit Application</button>
            </form>
        </div>
    );
}

