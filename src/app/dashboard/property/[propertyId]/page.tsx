import PageContainer from '@/components/layout/page-container';
import { buttonVariants } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { DataTableSkeleton } from '@/components/ui/table/data-table-skeleton';
import { searchParamsCache, serialize } from '@/lib/searchparams';
import { cn } from '@/lib/utils';
import { Plus, Clipboard } from 'lucide-react';
import Link from 'next/link';
import { SearchParams } from 'nuqs/server';
import { Suspense } from 'react';
import { auth } from '@/lib/auth';
import PropertyDetailsPage from './PropertyDetailsPage';

export const metadata = {
  title: 'Dashboard: Property Management',
};

type pageProps = {
  searchParams: Promise<SearchParams>;
  params: {
    propertyId: string;
  };
};

export default async function Page(props: pageProps) {
  const searchParams = await props.searchParams;
  const params = await props.params;
  // Allow nested RSCs to access the search params (in a type-safe way)
  searchParamsCache.parse(searchParams);

  // This key is used for invoke suspense if any of the search params changed (used for filters).
  const key = serialize({ ...searchParams });

  return (
    <PageContainer scrollable={false}>
      <div className='flex flex-1 flex-col space-y-4'>
        <div className='flex items-start justify-between'>
          <Heading
            title='Lease Management'
            description='Manage all your leases here.'
          />
          {/* TODO: add edit button */}
          {/* <Link
            href={'/dashboard/property/' + params.propertyId + '/edit'}
            className={cn(buttonVariants(), 'text-xs md:text-sm')}
          >
            <Clipboard className='mr-2 h-4 w-4' /> Edit (TODO)
          </Link> */}
        </div>
        <Suspense
          key={key}
          fallback={<DataTableSkeleton columnCount={5} rowCount={10} />}
        >
          {/* 根据propertyId查询property details */}
          <PropertyDetailsPage propertyId={params.propertyId} />
        </Suspense>
      </div>
    </PageContainer>
  );
}
