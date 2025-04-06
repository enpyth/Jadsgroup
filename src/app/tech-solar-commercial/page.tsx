import Image from "next/image"
import Hero from "@/components/home/hero"
import ImgWithSection from "@/components/home/section"
import Link from "next/link"
import { Button } from "@mui/material"

const sections = [
  {
    title: "Green Energy at market Plaza",
    contents: [
      "• MP supports Green energy etc",
      "• 1072 PV panels (500W module)",
      "• 16 Modules per string and 67 strings systems",
      "• 9 inverters with 450kW total AC output",
      "• Taking a total area of 2637 m2, this system will be able to generates approximately 762.2 MWh renewable energy per year, which equals to 42.3% of Market Plaza's annual consumption."
    ],
    imageSrc: "/imgs/tech/solar-commercial1.jpg",
    imageAlt: "",
    bgColor: "bg-red-600",
    textColor: "text-white",
    reverse: true,
  },
  {
    title: "Micro Grid",
    contents: [
      "To offer the efficient solar plan for your business, reduce energy consumption from conventional grid and reduce the cost of energy with a micro-grid from TODAY!"
    ],
    imageSrc: "/imgs/tech/solar-commercial2.jpg",
    imageAlt: "",
    bgColor: "bg-white",
    textColor: "text-gray-700",
  },
  {
    title: "Office",
    contents: [
      "Make everyone in the organisation aware of their responsibilities in maintaining and improving the quality of our products and service"
    ],
    imageSrc: "/imgs/tech/solar-commercial3.jpg",
    imageAlt: "",
    bgColor: "bg-cyan-950",
    textColor: "text-white",
    reverse: true,
  },
  {
    title: "Call Centre",
    contents: [
      "We are committed to a higher standard of customer satisfaction, consistent with professional standards and ethics as define by the professional bodies associated with the Quality Assurance Industry."
    ],
    imageSrc: "/imgs/tech/solar-commercial4.jpg",
    imageAlt: "",
    bgColor: "bg-red-600",
    textColor: "text-white",
  },
  {
    title: "EV Charge",
    contents: [
      "We're building out a convenient, reliable, customer-centric network of electric vehicle chargers nationwide—at workplaces, in communities, and on highways.",
      "We provide simple solutions for complex or challenging infrastructure problems. Our team of experts will guide you through the process from start to finish.",
      "Make your EV charging stations an investment, not an expense. We provide the best EV rebates in Australia so that you can increase the value of your property and focus on what's most important for your home, condo, or business.",
      "Our solution offers users the ability to effortlessly adapt with technological changes and not be tied to any one hardware or software provider helping you to easily stay up-to-speed with the technology for years to come."
    ],
    imageSrc: "/imgs/tech/solar-commercial5.jpg",
    imageAlt: "",
    bgColor: "bg-white",
    textColor: "text-gray-700",
    reverse: true,
  },
]

export default function SolarCommercial() {
  return (
    <main className="flex-grow">
      <Hero imageSrc="/banner/banner-solar-commercial.jpg" title="Solar Commercial" />

      <div className="max-w-5xl mx-auto px-4 py-12">
        {/* Business Partner Section */}
        <section className="mb-16 bg-gray-50 py-12">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-2">Power Purchase Agreements</h2>
            <div className="w-40 h-0.5 bg-red-600 mx-auto mb-12"></div>

            <div className="space-y-6">
              <p className="text-gray-700">
                Power Purchase Agreements (PPA) play a key role in our project development model. To date, we've financed projects that have been underpinned by 465MW worth of PPAs signed with a range of parties across the Australian market.
              </p>
              <p className="text-gray-700">
                As we continue to develop and finance further projects in our portfolio, we'll continue to sign PPAs. These will most likely be directly with end-use customers under corporate PPA arrangements. In fact, our extensive capability in solar and storage project development, plus the depth of our relationships across the sector, means we are well placed to meet the specific needs of these customers – now and in the future.
              </p>
              <p className="text-gray-700">
                If you'd like to find out how we can advise if a corporate PPA or alternative energy procurement strategy is right for your business, please contact us.
              </p>
              <div className="flex justify-center mt-8">
                <Button
                  variant="outlined"
                  color="error"
                  component={Link}
                  href="/contact"
                >
                  Please Contact Us
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Sections */}
        {sections.map((section, index) => (
          <ImgWithSection key={index} {...section} />
        ))}
      </div>
    </main>
  )
}

