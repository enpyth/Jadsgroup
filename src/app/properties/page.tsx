import { HeroSection } from '@/features/products/components/HeroSection';
import FeaturedProperties from '@/features/products/components/FeaturedProperties';
import RecentProperties from '@/features/products/components/RecentProperties';
import { CallToAction } from '@/features/products/components/CallToAction';
import { getPropertyWithDetails } from '@/db/queries/properties';
import { Product } from '@/constants/data';

export default async function Page() {
  const rawProducts = await getPropertyWithDetails();

  const products: Product[] = rawProducts.map((item) => ({
    id: item.property_id,
    release_time: item.releaseTime.toISOString(),
    category: '',
    owner: item.ownerName,
    agent: item.agentName,
    property_id: item.property_id,
    name: item.name,
    description: item.description,
    size: item.size,
    price: item.price,
    state: item.state,
    image: item.image || 'placeholder.jpg',
  }));

  return (
    <div className="min-h-screen w-full bg-gray-50">
      <HeroSection />
      <div className="container mx-auto px-8 py-16">
        <FeaturedProperties products={products} />
        {/* <RecentProperties products={products} /> */}
      </div>
      <CallToAction />
    </div>
  );
}