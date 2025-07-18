import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getPropertyById } from '@/db/queries/properties';

type pageProps = {
    params: {
        id: number;
    };
};

export default async function PropertyDetails(props: pageProps) {
    const params = await props.params;
    const property = await getPropertyById(params.id);

    if (!property) {
        notFound();
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Property Images */}
                <div className="space-y-4">
                    <div className="relative h-96 rounded-xl overflow-hidden">
                        <Image
                            src={'/placeholder.jpg'}
                            alt={property[0].name}
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        {/* Additional images can be added here */}
                    </div>
                </div>

                {/* Property Details */}
                <div className="space-y-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">{property[0].name}</h1>
                        <p className="text-gray-500 mt-2">{property[0].state}</p>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                            {property[0].size} m²
                        </div>
                    </div>

                    <div className="text-3xl font-bold text-gray-900">
                        ${property[0].price.toLocaleString()} / month
                    </div>

                    <div className="prose max-w-none">
                        <h2 className="text-xl font-semibold text-gray-900">Rent Review Percentage</h2>
                        <p className="text-gray-600">{(property[0].detail as any).rent_review_percentage}%</p>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold text-gray-900">Features</h2>
                        <ul className="grid grid-cols-2 gap-4 text-gray-600">
                            <li className="flex items-center">
                                <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                Air Conditioning
                            </li>
                            <li className="flex items-center">
                                <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                Parking Available
                            </li>
                            {/* Add more features as needed */}
                        </ul>
                    </div>

                    <div className="pt-6">
                        <Link
                            href={`/properties/application/${property[0].property_id}`}
                            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                        >
                            Apply Now
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
} 