import Image from "next/image"

interface AboutHeroProps {
  imageSrc?: string
  title?: string
}

export default function Hero({ imageSrc = "", title }: AboutHeroProps) {
  return (
    <section className="relative h-[400px] md:h-[300px]">
      {/* <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-blue-800/50 z-10"></div> */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-950/100 to-stone-900/10 z-10"></div>
      <Image src={imageSrc} alt="About Us Banner" fill className="object-cover" />
      <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-center items-center">
        <h1 className="text-4xl font-bold text-white">{title}</h1>
      </div>
    </section>
  )
}

