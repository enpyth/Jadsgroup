import FormCardSkeleton from '@/components/form-card-skeleton';
import PageContainer from '@/components/layout/page-container';
import { Suspense } from 'react';
import ProductViewPage from '@/features/products/components/product-view-page';

export const metadata = {
  title: 'Dashboard : Product View'
};

type PageProps = { params: Promise<{ propertyId: string }> };

export default async function Page(props: PageProps) {
  const params = await props.params;
  return (
    <div>TODO workflow</div>
  );
}