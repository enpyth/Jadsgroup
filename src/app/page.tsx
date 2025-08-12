import HeroCarousel from "@/components/home/carousel"
import CompanyIntro from "@/components/home/intro"
import ServicesGrid from "@/components/home/services"
import PartnerSection from "@/components/home/partner"
import ContactForm from "@/components/home/contact-form"
import PropertyCarousel from "@/components/PropertyCarousel"
import { getPropertyWithDetails } from "@/db/queries/properties"

export default async function Home() {
  // Fetch properties server-side
  let properties: any[] = [];
  
  try {
    const propertiesData = await getPropertyWithDetails();
    properties = propertiesData.slice(0, 10).map(prop => ({
      ...prop,
      property_id: prop.property_id,
      describe: prop.description || '',
      detail: prop.detail || {},
      agentPhone: '',
      agentEmail: '',
      image: prop.image || '/public/placeholder.jpg',
      releaseTime: prop.releaseTime || new Date(),
    }));
  } catch (error) {
    console.error('Error fetching properties:', error);
    // Fall back to empty array - PropertyCarousel will show mock data
  }

  return (
    <div>
      <HeroCarousel />
      <CompanyIntro />
      <PropertyCarousel 
        properties={properties}
        loading={false}
      />
      <ServicesGrid />
      <ContactForm />
      <PartnerSection />
    </div>
  )
}

