import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { DataTableSkeleton } from '@/components/ui/table/data-table-skeleton';
import { searchParamsCache, serialize } from '@/lib/searchparams';
import { SearchParams } from 'nuqs/server';
import { Suspense } from 'react';
import ListingLandowner from '@/features/products/components/listing-landowner';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
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
                    <Link
                        href="/dashboard/landowner/new"
                        className={cn(buttonVariants(), 'text-xs md:text-sm')}
                    >
                        <Plus className="h-4 w-4" />
                        Add New Landowner
                    </Link>
                </div>
                <Separator />
                {/* <ProductTableAction /> */}
                <Suspense
                    key={key}
                    fallback={<DataTableSkeleton columnCount={5} rowCount={10} />}
                >
                    <ListingLandowner />
                </Suspense>
            </div>
        </PageContainer>
    );
}
