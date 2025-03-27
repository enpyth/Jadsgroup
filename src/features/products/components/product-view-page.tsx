import { Product } from '@/constants/data';
import { notFound } from 'next/navigation';
import ProductForm from './product-form';
import { getPropertyById } from '@/db/queries/properties'
type TProductViewPageProps = {
  productId: string;
};

export default async function ProductViewPage({
  productId
}: TProductViewPageProps) {
  let product = null;
  let pageTitle = 'Create New Product';

  if (productId !== 'new') {
    const data = await getPropertyById(Number(productId));
    const property = data[0];
    if (!property) {
      notFound();
    }
    product = {
      id: property.property_id,
      name: property.name,
      description: property.describe,
      price: property.price,
      size: property.size,
      image: property.image,
      release_time: property.release_time.toISOString(),
      category: 'Jadsgroup', // Default category
      state: property.state,
      owner: property.owner_id.toString(),
      agent: property.agent_id.toString()
    } as Product;
    pageTitle = `TODO Edit Property`;
  }

  return <ProductForm initialData={product} pageTitle={pageTitle} />;
}
