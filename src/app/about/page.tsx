import Hero from "@/components/home/hero"
import AboutIntro from "@/components/about/intro"
import TeamSection from "@/components/about/team"
import ServiceSection from "@/components/about/service"

export default function AboutUs() {
  return (
    <main className="flex-grow">
      <Hero imageSrc="/banner/banner-about.jpeg" title="About Us"/>
      <AboutIntro />
      <ServiceSection />
      <TeamSection />
    </main>
  )
}

