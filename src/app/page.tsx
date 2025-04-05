import HeroCarousel from "@/components/home/carousel"
import CompanyIntro from "@/components/home/intro"
import ServicesGrid from "@/components/home/services"
import PartnerSection from "@/components/home/partner"
import ContactForm from "@/components/home/contact-form"

export default function Home() {
  return (
    <div>
      <HeroCarousel />
      <CompanyIntro />
      <ServicesGrid />
      <PartnerSection />
      <ContactForm />
    </div>
  )
}

