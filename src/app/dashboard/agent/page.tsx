import PageContainer from "@/components/layout/page-container";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTableSkeleton } from "@/components/ui/table/data-table-skeleton";
import { searchParamsCache, serialize } from "@/lib/searchparams";
import { SearchParams } from "nuqs/server";
import { Suspense } from "react";
import ListingAgent from "@/features/products/components/listing-agent";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
// import ProductTableAction from '@/features/products/components/product-tables/product-table-action';

export const metadata = {
  title: "Dashboard: Agent Management",
};

type pageProps = {
  searchParams: Promise<SearchParams>;
};

// TODO: accessibility
export default async function AgentListPage(props: pageProps) {
  const searchParams = await props.searchParams;
  // Allow nested RSCs to access the search params (in a type-safe way)
  searchParamsCache.parse(searchParams);

  // This key is used for invoke suspense if any of the search params changed (used for filters).
  const key = serialize({ ...searchParams });

  return (
    <PageContainer scrollable={false}>
      <div className="flex flex-1 flex-col space-y-4">
        <div className="flex items-start justify-between">
          <Heading
            title="Agent Management"
            description="Manage all your agents here."
          />
          <Link
            href="/dashboard/agent/new"
            className={cn(
              "inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-all duration-200 hover:bg-blue-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 active:scale-95",
              "text-xs md:text-sm"
            )}
          >
            <Plus className="h-4 w-4" />
            Add New Agent
          </Link>
        </div>
        <Separator />
        {/* <ProductTableAction /> */}
        <Suspense
          key={key}
          fallback={<DataTableSkeleton columnCount={5} rowCount={10} />}
        >
          <ListingAgent />
        </Suspense>
      </div>
    </PageContainer>
  );
}
