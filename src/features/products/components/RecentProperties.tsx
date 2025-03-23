import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/constants/data';

const RecentProperties = ({ products }: {products: Product[]}) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Recent Properties</h2>
        <Link href="/properties/recent" className="text-blue-600 hover:text-blue-800 font-medium">
          View all recent →
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.slice(3).map((product) => (
          <Link
            href={`/application/${product.id}`}
            key={product.id}
            className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
          >
            <div className="relative h-48">
              <Image
                src={product.image}
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
                  {product.state}
                </span>
                <span className="text-gray-500 text-xs">
                  {new Date(product.release_time).toLocaleDateString('en-US')}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RecentProperties; 