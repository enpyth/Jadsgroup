'use client';
import { Lease } from '@/constants/data';
import { ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';
import { CellAction } from './cell-action';

export const columns: ColumnDef<Lease>[] = [
  {
    accessorKey: 'lease_id',
    header: 'ID'
  },
  {
    accessorKey: 'property_id',
    header: 'Property'
  },
  {
    accessorKey: 'start_date',
    header: 'Start'
  },
  {
    accessorKey: 'end_date',
    header: 'End'
  },
  {
    accessorKey: 'deposit_amount',
    header: 'Deposit'
  },
  {
    accessorKey: 'rent_amount',
    header: 'Price ($/week)'
  },
];
