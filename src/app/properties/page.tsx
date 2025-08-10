import { HeroSection } from '@/features/products/components/HeroSection';
import PropertyCard from '@/features/products/components/PropertyCard';
import RecentProperties from '@/features/products/components/RecentProperties';
import { CallToAction } from '@/features/products/components/CallToAction';
import { getPropertyWithDetails } from '@/db/queries/properties';

export default async function Page() {
  const rawProducts = await getPropertyWithDetails();

  const products: any[] = rawProducts.map((item) => ({
    id: item.property_id,
    release_time: item.releaseTime.toISOString(),
    category: '',
    owner: item.ownerName,
    name: item.name,
    description: item.description,
    size: item.size,
    price: item.price,
    unit: item.unit,
    state: item.state,
    image: item.image || 'placeholder.jpg',
    agent: {
      brokerName: item.agentName,
      companyName: item.agentAgencyName,
      img: item.agentImg,
    },
  }));

  return (
    <div className="min-h-screen w-full bg-gray-50">
      <HeroSection />
      <div className="container mx-auto px-8 py-16">
        <div className="mb-16">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Explore all things property</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {products.slice(0, 9).map((item: any) => (
              <PropertyCard key={item.id} item={item} />
            ))}
          </div>
        </div>
        {/* <RecentProperties products={products} /> */}
      </div>
      <CallToAction />
    </div>
  );
}