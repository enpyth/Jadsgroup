import Link from "next/link";
import Image from "next/image";

const PropertyCard = ({ item }: any) => {
  return (
    <Link
      href={`/properties/${item.id}`}
      className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 h-[28rem]"
    >
      {/* Company Name - Top of Image */}
      <div className="bg-gray-300 px-4 py-2 border-b">
        <p className="text-sm font-medium text-gray-900 text-center truncate">
          {item.agent.companyName}
        </p>
      </div>
      
      {/* Image Section - Enlarged */}
      <div className="relative h-72">
        <div className="absolute top-4 left-4 z-10 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
          Sale
        </div>

        {/* Agent Info - Top Right Corner */}
        <div className="absolute top-4 right-4 z-10 bg-black/30 backdrop-blur-sm rounded-lg p-2 flex items-center gap-2">
          <div className="min-w-0">
            <p className="text-xs font-medium text-white truncate max-w-20">
              {item.agent.brokerName}
            </p>
          </div>
          <div className="relative h-6 w-6 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
              <Image
                src={item.agent.img || '/placeholder.jpg'}
                alt={`${item.agent.brokerName} avatar`}
                fill
                className="object-cover"
              />
          </div>
        </div>

        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Bottom Section - Property Info Only */}
      <div className="h-32 p-4 flex flex-col justify-start">
        <p className="text-lg font-bold text-gray-900 mb-1 truncate">
          {item.name} / unit {item.unit}
        </p>
        <p className="text-lg font-semibold text-gray-800 mb-2">
          ${item.price}
        </p>
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            {item.size} m²
          </div>
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            61-63 Grote Street, Adelaide,SA
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;
