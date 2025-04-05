import Image from "next/image"
import Hero from "@/components/home/hero"
import Section from "@/components/home/section"

const sections = [
  {
    title: "Experienced Strata and property manager",
    content: "We prepare commercial lease agreements outlining the terms and conditions of the lease between the landlord (lessor) and the tenant (lessee) that comply with the local laws and bylaws.",
    imageSrc: "/imgs/stratamanagement/1.jpg",
    imageAlt: "Land Subdivision",
    bgColor: "bg-white",
    textColor: "text-gray-700",
  },
  {
    title: "Bylaws and Rules",
    content: "Each strata-titled development has its own set of bylaws and rules that govern the behaviour and activities of residents within the community.",
    imageSrc: "/imgs/stratamanagement/2.jpg",
    imageAlt: "Infrastructure",
    bgColor: "bg-cyan-950",
    textColor: "text-white",
    reverse: true,
  },
  {
    title: "Property Maintenance and Risk Management",
    content: "Coordinate maintenance and repairs, addressing tenant concerns and ensuring that the property is well-maintained. We also identify and mitigate risks, implement preventative measures to reduce the likelihood of issues such as property damage, late rent payments, and legal disputes.",
    imageSrc: "/imgs/stratamanagement/3.jpg",
    imageAlt: "Community Development",
    bgColor: "bg-red-600",
    textColor: "text-white",
  },
  {
    title: "Financial Management",
    content: "Provide financial planning, budgeting, and collection of levies or fees from owners to cover common expenses. The funds are then used for maintenance, repairs, insurance, and other shared costs.",
    imageSrc: "/imgs/stratamanagement/4.jpg",
    imageAlt: "Community Titles",
    bgColor: "bg-white",
    textColor: "text-gray-700",
    reverse: true,
  },
  {
    title: "Insurance Management",
    content: "We work collaboratively with property owners, contractors, and other stakeholders to ensure the strata corporation has adequate insurance coverage such as liability insurance, building insurance, and other relevant policies.",
    imageSrc: "/imgs/stratamanagement/5.jpg",
    imageAlt: "Strata Development",
    bgColor: "bg-cyan-950",
    textColor: "text-white",
  },
  {
    title: "Meetings and Decision-Making",
    content: "Chair regular meetings, such as annual general meetings (AGMs), are held to discuss matters affecting the strata community. The decisions on budgeting, repairs, and other important issues are typically made collectively through voting by owners.",
    imageSrc: "/imgs/stratamanagement/6.jpg",
    imageAlt: "Community Titles",
    bgColor: "bg-red-600",
    textColor: "text-white",
    reverse: true,
  },
  {
    title: "Dispute Resolution",
    content: "We resolve disputes among owners or between owners and the strata corporation. This can include issues related to bylaw violations, property damage, or disagreements over maintenance responsibilities.",
    imageSrc: "/imgs/stratamanagement/7.jpg",
    imageAlt: "Strata Development",
    bgColor: "bg-white",
    textColor: "text-gray-700",
  },
]

export default function ProjManagement() {
  return (
    <main className="flex-grow">
      <Hero imageSrc="/banner/banner-strata.jpeg" title="Strata Management" />

      <div className="max-w-5xl mx-auto px-4 py-12">
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-2">Wanted: Shopping Centre</h2>
          <div className="w-24 h-1 bg-red-600 mx-auto mb-12"></div>

          <div className="space-y-6">
            <p className="text-gray-700">
              We specialise in Strata management, also known as body corporate management, the management of multi-unit developments where there are multiple individual properties (lots or units) that share common areas and facilities.
            </p>
          </div>
        </section>

        {/* Sections */}
        {sections.map((section, index) => (
          <Section key={index} {...section} />
        ))}
      </div>
    </main>
  )
}

