import { fakeProducts } from '@/constants/mock-api';
import Image from 'next/image';
import Link from 'next/link';
import { SearchBar } from '@/features/products/components/search-bar';

async function getProducts() {
  const response = await fakeProducts.getProducts({
    limit: 7,
    page: 1
  });
  return response.products;
}

export default async function Page() {
  const products = await getProducts();

  return (
    <div className="min-h-screen w-full bg-gray-50">
      {/* Hero Section with Search */}
      <div className="relative h-[500px] w-full">
        <Image
          src="/homepage.jpg" // 请确保添加一张高质量的房地产背景图
          alt="Beautiful homes"
          fill
          priority
          className="object-cover brightness-75"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60">
          <div className="container mx-auto px-8 h-full flex flex-col justify-center items-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 text-center">
              Find Your Dream Property
            </h1>
            <p className="text-xl text-white/90 mb-10 text-center max-w-2xl">
              Discover properties for sale and rent in Market & Plaza
            </p>
            <SearchBar />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-8 py-16">
        {/* Featured Properties Section */}
        <div className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Featured Properties</h2>
            <Link href="/properties" className="text-blue-600 hover:text-blue-800 font-medium">
              View all properties →
            </Link>
          </div>

          {/* Property Cards - First Row (Featured) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.slice(0, 3).map((product) => (
              <Link 
                href={`/application/${product.id}`} 
                key={product.id}
                className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-64">
                  <div className="absolute top-4 left-4 z-10 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Featured
                  </div>
                  <Image
                    src={product.photo_url}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <p className="text-2xl font-bold text-gray-900 mb-2">${product.price.toLocaleString()}</p>
                  <p className="text-lg font-semibold text-gray-800 mb-2">{product.name}</p>
                  <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                      {product.category}
                    </span>
                    <div className="flex items-center text-gray-500 text-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {new Date(product.updated_at).toLocaleDateString('en-US')}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Properties Section */}
        <div>
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Recent Properties</h2>
            <Link href="/properties/recent" className="text-blue-600 hover:text-blue-800 font-medium">
              View all recent →
            </Link>
          </div>

          {/* Property Cards - Regular Listings */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.slice(3).map((product) => (
              <Link 
                href={`/application/${product.id}`} 
                key={product.id}
                className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <div className="relative h-48">
                  <Image
                    src={product.photo_url}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                    <p className="text-white font-bold">${product.price.toLocaleString()}</p>
                  </div>
                </div>
                <div className="p-4">
                  <p className="font-medium text-gray-900 mb-1 truncate">{product.name}</p>
                  <p className="text-gray-600 text-sm mb-2 line-clamp-1">{product.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                      {product.category}
                    </span>
                    <span className="text-gray-500 text-xs">
                      {new Date(product.updated_at).toLocaleDateString('en-US')}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="bg-blue-600 py-16">
        <div className="container mx-auto px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Find Your Perfect Home?</h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who found their dream properties with us.
          </p>
          <Link 
            href="/contact" 
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors duration-300"
          >
            Contact an Agent Today
          </Link>
        </div>
      </div>
    </div>
  );
}