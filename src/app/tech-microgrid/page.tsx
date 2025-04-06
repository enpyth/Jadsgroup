import Image from "next/image"
import Hero from "@/components/home/hero"
import Section from "@/components/home/section"
import CarouselCard from "@/components/home/carousel-card"

const sections = [
  {
    title: "",
    contents: [
      "tech_p1_1",
      "tech_p1_2",
      "tech_p1_3",
      "tech_p1_4",
      "tech_p1_5",
    ],
    imageSrc: "/imgs/tech/microgrid1.jpg",
    imageAlt: "Land Subdivision",
    bgColor: "bg-grey-50",
    textColor: "text-gray-700",
  },
  {
    title: "",
    contents: [
      "tech_p1_1",
      "tech_p1_2",
      "tech_p1_3",
      "tech_p1_4",
    ],
    imageSrc: "/imgs/tech/microgrid2.jpg",
    imageAlt: "Infrastructure",
    bgColor: "bg-cyan-950",
    textColor: "text-white",
    reverse: true,
  },
]

// TODO: 3/10
const slides = [
  {
    id: 1,
    image: "/imgs/tech/microgrid3.jpg",
    title: "Model 1: Regional Micro-grid",
    contents: [
      "tech_carousel_m1_1",
      "tech_carousel_m1_2",
      "tech_carousel_m1_3",
    ]
  },
  {
    id: 2,
    image: "/imgs/tech/microgrid4.jpg",
    title: "Model 2: Embedded Micro-grid",
    contents: [
      "tech_carousel_m2_1",
      "tech_carousel_m2_2",
      "tech_carousel_m2_3",
    ]
  },
  {
    id: 3,
    image: "/imgs/tech/microgrid5.jpg",
    title: "Model 3: Virtual Micro-grid",
    contents: [
      "tech_carousel_m3_1",
      "tech_carousel_m3_2",
      "tech_carousel_m3_3",
    ]
  },
]

export default function TechMicrogrid() {
  return (
    <main className="flex-grow">
      <Hero imageSrc="/banner/banner-microgrid.jpg" title="Microgrid" />

      <div className="max-w-5xl mx-auto px-4 py-12">
        {/* Business Partner Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-2">
            What is <span className="text-red-700">Micro-grid</span>
          </h2>

        </section>

        {/* Sections */}
        {sections.map((section, index) => (
          <Section key={index} {...section} />
        ))}
      </div>

      <CarouselCard slides={slides} />

    </main>
  )
}

