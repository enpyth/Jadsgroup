import Link from 'next/link';

export const CallToAction = () => {
  return (
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
  );
}; 