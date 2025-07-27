import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { DataTableSkeleton } from '@/components/ui/table/data-table-skeleton';
import { searchParamsCache, serialize } from '@/lib/searchparams';
import { SearchParams } from 'nuqs/server';
import { Suspense } from 'react';
import ListingLeasePage from '@/features/products/components/listing-lease';
import ProductTableAction from '@/features/products/components/product-tables/product-table-action';

export const metadata = {
    title: 'Dashboard: Property Management',
};

type pageProps = {
    searchParams: Promise<SearchParams>;
};

export default async function LeasePage(props: pageProps) {
    const searchParams = await props.searchParams;
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
                    <ListingLeasePage searchParams={searchParams} />
                </Suspense>
            </div>
        </PageContainer>
    );
}
