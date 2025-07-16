import { getPropertyById } from '@/db/queries/properties';
import Image from 'next/image';
import { notFound } from 'next/navigation';

interface PropertyDetailsPageProps {
  propertyId: string;
}

export default async function PropertyDetailsPage({ propertyId }: PropertyDetailsPageProps) {
  const data = await getPropertyById(Number(propertyId));
  const property = data[0];
  if (!property) return notFound();

  return (
    <div className="bg-white rounded-lg shadow p-6 mt-4">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-shrink-0 w-full md:w-1/3">
          <Image
            src={property.image || '/placeholder.jpg'}
            alt={property.name}
            width={400}
            height={300}
            className="rounded-lg object-cover"
          />
        </div>
        <div className="flex-1 space-y-2">
          <h2 className="text-2xl font-bold">{property.name}</h2>
          <p className="text-gray-600">{property.describe}</p>
          <div className="flex gap-4 mt-2">
            <span className="text-gray-800 font-semibold">Size:</span> {property.size} m²
            <span className="text-gray-800 font-semibold">Price:</span> ${property.price}
            <span className="text-gray-800 font-semibold">State:</span> {property.state}
          </div>
          {(property.detail as any) && typeof property.detail === 'object' && !Array.isArray(property.detail) && (
            <div className="mt-4">
              <h3 className="font-semibold text-lg mb-2">Details</h3>
              <ul className="list-disc ml-6 text-gray-700">
                {Object.entries(property.detail as any).map(([key, value]) => (
                  <li key={key}><span className="font-medium">{key}:</span> {value !== undefined && value !== null ? String(value) : ''}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 