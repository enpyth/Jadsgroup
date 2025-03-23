'use client'
import { redirect } from 'next/navigation';
import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function page() {
    const { data: session } = useSession();
    const params = useParams();
    const [formData, setFormData] = useState({
        agreement: false,
        rent_amount: 0,
        deposit_amount: 0,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
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
                property_id: params.id,
                tenant_email: session?.user?.email,
                start_date: new Date(),
                end_date: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
                rent_amount: formData.rent_amount,
                deposit_amount: formData.deposit_amount,
                stage: 's1',
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
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Rental Application Form</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <label className="block">
                    Rent Amount:
                    <input type="number" name="rent_amount" value={formData.rent_amount} onChange={handleChange} required className="border rounded p-2 w-full" />
                </label>
                <label className="block">
                    Deposit Amount:
                    <input type="number" name="deposit_amount" value={formData.deposit_amount} onChange={handleChange} required className="border rounded p-2 w-full" />
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

