import { getOwnerById } from '@/db/queries/properties';
import { notFound } from 'next/navigation';
import { CompanyData } from 'types';

interface LandownerDetailsPageProps {
  landownerId: string;
}

export default async function LandownerDetailsPage({ landownerId }: LandownerDetailsPageProps) {
  const data = await getOwnerById(Number(landownerId));
  const owner = data[0];
  if (!owner) return notFound();

  return (
    <div className="bg-white rounded-lg shadow p-6 mt-4">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 space-y-4">
          <div className="border-b pb-4">
            <h2 className="text-2xl font-bold text-gray-900">{owner.name}</h2>
            <p className="text-gray-600 mt-1">Company: {typeof owner.company === 'string' ? owner.company : (owner.company as CompanyData)?.name}</p>
            <p className="text-gray-600 mt-1">ACN: {typeof owner.company === 'string' ? owner.company : (owner.company as CompanyData)?.acn}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Contact Information</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <span className="text-gray-600 font-medium w-20">Email:</span>
                    <span className="text-gray-900">{owner.email}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-600 font-medium w-20">Phone:</span>
                    <span className="text-gray-900">{owner.phone}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-600 font-medium w-20">Address:</span>
                    <span className="text-gray-900">{owner.address}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Owner Details</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <span className="text-gray-600 font-medium w-20">Owner ID:</span>
                    <span className="text-gray-900">{owner.owner_id}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t pt-4">
            <div className="flex items-center">
              <span className="text-gray-600 font-medium">Created:</span>
              <span className="text-gray-900 ml-2">
                {new Date(owner.created_at).toLocaleString("en-AU", {
                  timeZone: "Australia/Adelaide",
                })}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 