import Image from "next/image"
import Hero from "@/components/home/hero"
import ImgWithSection from "@/components/home/section"

const sections = [
  {
    title: "Land Subdivision",
    contents: [
      "Land subdivision is the process of dividing a single piece of land into smaller parcels can help increase the overall value of the property. Smaller, individually titled lots often have higher market appeal, attracting a broader range of potential buyers."
    ],
    imageSrc: "/imgs/projmanagement/1.jpg",
    imageAlt: "Land Subdivision",
    bgColor: "bg-white",
    textColor: "text-gray-700",
    reverse: true,
  },
  {
    title: "Infrastructure",
    contents: [
      "Large-scale developments often come with infrastructure improvements. Developers may be required to invest in roads, utilities, and public spaces, benefiting not only the development itself but also the surrounding community."
    ],
    imageSrc: "/imgs/projmanagement/2.jpg",
    imageAlt: "Infrastructure",
    bgColor: "bg-cyan-950",
    textColor: "text-white",
  },
  {
    title: "Community Development",
    contents: [
      "Property development projects, particularly those with a focus on mixed-use developments, can contribute to the creation of vibrant and sustainable communities. This includes providing amenities, green spaces, and commercial spaces that enhance the overall living experience."
    ],
    imageSrc: "/imgs/projmanagement/3.jpg",
    imageAlt: "Community Development",
    bgColor: "bg-red-600",
    textColor: "text-white",
    reverse: true,
  },
  {
    title: "Community Titles",
    contents: [
      "Community title developments is the division of land into lots, each with its own title, and the creation of common property for the use and enjoyment of all owners within the community. This form of property ownership structure allows for the creation of communities with shared amenities, common areas, and facilities."
    ],
    imageSrc: "/imgs/projmanagement/4.jpg",
    imageAlt: "Community Titles",
    bgColor: "bg-white",
    textColor: "text-gray-700",
  },
  {
    title: "Strata Development",
    contents: [
      "In a strata-titled development, each individual owner has ownership of their unit or lot. Additionally, there is shared ownership of common property, which typically includes areas like driveways, lobbies, stairwells, gardens, and recreational facilities."
    ],
    imageSrc: "/imgs/projmanagement/5.jpg",
    imageAlt: "Strata Development",
    bgColor: "bg-cyan-950",
    textColor: "text-white",
    reverse: true,
  },
]

export default function ProjManagement() {
  return (
    <main className="flex-grow">
      <Hero imageSrc="/banner/banner-project.jpeg" title="Project Management"/>

      <div className="max-w-5xl mx-auto px-4 py-12">
        {/* Business Partner Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-2">Business Partner</h2>
          <div className="w-40 h-0.5 bg-red-600 mx-auto mb-12"></div>

          <div className="space-y-6">
            <p className="text-gray-700">
              JADS Group can assist in Subdivision projects in joint-venture that align with city planning goals,
              promoting more efficient land use, better infrastructure planning, and improved urban development.
            </p>
            <p className="text-gray-700">
              And we have experience with working with various professionals and trades to help define and document the
              project scope, ensuring that everyone involved understands the goals, deliverables, and constraints.
            </p>
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

