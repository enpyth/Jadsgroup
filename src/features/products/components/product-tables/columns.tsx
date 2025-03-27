'use client';
import { Product } from '@/constants/data';
import { ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';
import { CellAction } from './cell-action';

export const columns: ColumnDef<Product>[] = [
  // {
  //   accessorKey: 'image',
  //   header: 'IMAGE',
  //   cell: ({ row }) => {
  //     return (
  //       <div className='relative aspect-square'>
  //         <Image
  //           src={row.getValue('image')}
  //           alt={row.getValue('name')}
  //           fill
  //           className='rounded-lg'
  //         />
  //       </div>
  //     );
  //   }
  // },
  {
    accessorKey: 'name',
    header: 'Name'
  },
  {
    accessorKey: 'agent',
    header: 'Agent'
  },
  {
    accessorKey: 'owner',
    header: 'Owner'
  },
  {
    accessorKey: 'price',
    header: 'Price ($/week)'
  },
  {
    accessorKey: 'state',
    header: 'State'
  },

  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
