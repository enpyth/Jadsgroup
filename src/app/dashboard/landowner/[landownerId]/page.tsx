import PageContainer from '@/components/layout/page-container';
import { buttonVariants } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { DataTableSkeleton } from '@/components/ui/table/data-table-skeleton';
import { searchParamsCache, serialize } from '@/lib/searchparams';
import { cn } from '@/lib/utils';
import { Edit } from 'lucide-react';
import Link from 'next/link';
import { SearchParams } from 'nuqs/server';
import { Suspense } from 'react';
import LandownerDetailsPage from './LandownerDetailsPage';

export const metadata = {
  title: 'Dashboard: Landowner Management',
};

type pageProps = {
  searchParams: Promise<SearchParams>;
  params: {
    landownerId: string;
  };
};

export default async function Page(props: pageProps) {
  const searchParams = await props.searchParams;
  const params = await props.params;
  searchParamsCache.parse(searchParams);
  const key = serialize({ ...searchParams });

  return (
    <PageContainer scrollable={false}>
      <div className='flex flex-1 flex-col space-y-4'>
        <div className='flex items-start justify-between'>
          <Heading
            title='Landowner Details'
            description='View and manage landowner information.'
          />
          <Link
            href={'/dashboard/landowner/' + params.landownerId + '/edit'}
            className={cn(buttonVariants(), 'text-xs md:text-sm')}
          >
            <Edit className='mr-2 h-4 w-4' /> Edit
          </Link>
        </div>
        <Suspense
          key={key}
          fallback={<DataTableSkeleton columnCount={5} rowCount={10} />}
        >
          <LandownerDetailsPage landownerId={params.landownerId} />
        </Suspense>
      </div>
    </PageContainer>
  );
} 