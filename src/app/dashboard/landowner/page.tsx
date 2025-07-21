import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { DataTableSkeleton } from '@/components/ui/table/data-table-skeleton';
import { searchParamsCache, serialize } from '@/lib/searchparams';
import { SearchParams } from 'nuqs/server';
import { Suspense } from 'react';
import ListingOutgoing from '@/features/products/components/listing-outgoing';
// import ProductTableAction from '@/features/products/components/product-tables/product-table-action';

export const metadata = {
    title: 'Dashboard: Landowner Management',
};

type pageProps = {
    searchParams: Promise<SearchParams>;
};

// TODO: accessibility
export default async function LandownerListPage(props: pageProps) {
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
                        title='Landowner Management'
                        description='Manage all your landowners here.'
                    />
                </div>
                <Separator />
                {/* <ProductTableAction /> */}
                <Suspense
                    key={key}
                    fallback={<DataTableSkeleton columnCount={5} rowCount={10} />}
                >
                    <ListingOutgoing />
                </Suspense>
            </div>
        </PageContainer>
    );
}
