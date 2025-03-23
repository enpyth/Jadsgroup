import Image from 'next/image';
import { SearchBar } from '@/features/products/components/search-bar';

export const HeroSection = () => {
  return (
    <div className="relative h-[500px] w-full">
      <Image
        src="/homepage.jpg"
        alt="Beautiful homes"
        fill
        priority
        className="object-cover brightness-75"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60">
        <div className="container mx-auto px-8 h-full flex flex-col justify-center items-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 text-center">
            Jadsgroup & Market Plaza
          </h1>
          <p className="text-xl text-white/90 mb-1 text-center max-w-2xl">
            Find Your Dream Property
          </p>
          <p className="text-xl text-white/90 mb-10 text-center max-w-2xl">
            Discover properties for sale and rent in Market & Plaza
          </p>
          <SearchBar />
        </div>
      </div>
    </div>
  );
}; 