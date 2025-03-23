import PageContainer from '@/components/layout/page-container';
import { buttonVariants } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { DataTableSkeleton } from '@/components/ui/table/data-table-skeleton';
import { searchParamsCache, serialize } from '@/lib/searchparams';
import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { SearchParams } from 'nuqs/server';
import { Suspense } from 'react';
import LeaseListingPage from '@/features/products/components/lease-listing';
import ProductTableAction from '@/features/products/components/product-tables/product-table-action';
import { auth } from '@/lib/auth';
import { isCustomer } from '@/constants/data';

export const metadata = {
    title: 'Dashboard: Property Management',
};

type pageProps = {
    searchParams: Promise<SearchParams>;
};

export default async function Page(props: pageProps) {
    const searchParams = await props.searchParams;
    // Allow nested RSCs to access the search params (in a type-safe way)
    searchParamsCache.parse(searchParams);

    // This key is used for invoke suspense if any of the search params changed (used for filters).
    const key = serialize({ ...searchParams });

    const session = await auth();
    if (isCustomer(session?.user?.email || '')) {
        return (
            <PageContainer scrollable={false}>
                <div className='flex flex-1 flex-col space-y-4'>
                    <div className='flex items-start justify-between'>
                        <Heading
                            title='Lease Management'
                            description='Manage all your leases here.'
                        />
                        {/* <Link
                            href='/dashboard/product/new'
                            className={cn(buttonVariants(), 'text-xs md:text-sm')}
                        >
                            <Plus className='mr-2 h-4 w-4' /> Add New
                        </Link> */}
                    </div>
                    <Separator />
                    <ProductTableAction />
                    <Suspense
                        key={key}
                        fallback={<DataTableSkeleton columnCount={5} rowCount={10} />}
                    >
                        <LeaseListingPage />
                    </Suspense>
                </div>
            </PageContainer>
        );
    } else {
        return (
            <div>
                <h1>no pemission</h1>
            </div>
        );
    }

}
