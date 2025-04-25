'use client';
import { Product } from '@/constants/data';
import { Lease } from '@/constants/data';
import { ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';
import { CellAction } from './cell-action';

export const columns: ColumnDef<Lease>[] = [

  {
    accessorKey: 'property_name',
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
  {
    accessorKey: 'stage',
    header: 'stage'
  },
  {
    accessorKey: 'agreement_to_lease',
    header: 'agreement_to_lease'
  },
  {
    accessorKey: 'created_at',
    header: 'Created At'
  },
];
