import Hero from "@/components/home/hero"
import CarouselCard from "@/components/home/carousel-card"
import TeamSection from "@/components/about/team"
import ServiceSection from "@/components/about/service"

const slides = [
  {
    id: 1,
    image: "/about/intro1.jpg",
    title: "",
    contents: [
      "companyHistory1",
    ]
  },
  {
    id: 2,
    image: "/about/intro2.jpg",
    title: "",
    contents: [
      "companyHistory2",
    ]
  },
  {
    id: 3,
    image: "/about/intro3.jpg",
    title: "",
    contents: [
      "companyHistory3",
    ]
  },
]

export default function AboutUs() {
  return (
    <main className="flex-grow">
      <Hero imageSrc="/banner/banner-about.jpeg" title="About Us" />
      <CarouselCard slides={slides} />
      <ServiceSection />
      <TeamSection />
    </main>
  )
}

