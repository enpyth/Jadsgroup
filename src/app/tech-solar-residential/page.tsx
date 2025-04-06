import Image from "next/image"
import Hero from "@/components/home/hero"
import ImgWithSection from "@/components/home/section"
import Link from "next/link"
import { Button } from "@mui/material"

const sections = [
  {
    title: "Investment",
    contents: [
      "Solar power is a big investment and for some, this can be daunting. However, with conventional sources of energy increasing and the prices of solar solutions decreasing, switching to solar is not only easy and cost-effective, it's the smart move to make.",
    ],
    imageSrc: "/imgs/tech/solar-residential1.jpg",
    imageAlt: "",
    bgColor: "bg-white",
    textColor: "text-gray-700",
  },
  {
    title: "Savings",
    contents: [
      "Installing solar panels will lead to a reduction in your monthly utility bill, and in some cases, can eliminate your bill altogether. Solar can also add value to your home if and when you choose to sell because buyers know they will inherit a reduced utility bill.",
      "By switching to solar, you can be confident that your energy needs will be met, you will make substantial savings on your energy bill and you are contributing to a renewable energy future."
    ],
    imageSrc: "/imgs/tech/solar-residential2.jpg",
    imageAlt: "",
    bgColor: "bg-cyan-950",
    textColor: "text-white",
    reverse: true,
  },
]

export default function TechSolarResidentialPage() {
  return (
    <main className="flex-grow">
      <Hero imageSrc="/banner/banner-solar-commercial.jpg" title="Solar Commercial" />

      <div className="max-w-5xl mx-auto px-4 py-12">
        {/* Business Partner Section */}
        <section className="mb-6 py-12">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-2">Rooftop System</h2>
            <div className="w-40 h-0.5 bg-red-600 mx-auto mb-12"></div>
          </div>
        </section>

        {/* Sections */}
        {sections.map((section, index) => (
          <ImgWithSection key={index} {...section} />
        ))}

        {/* Vertical Images */}
        <div className="space-y-6 mb-12">
          <div className="relative w-full h-[400px]">
            <Image
              src="/imgs/tech/solar-residential3.jpg"
              alt="Solar Residential 3"
              fill
              className="object-cover rounded-lg"
            />
          </div>
          <div className="relative w-full h-[400px]">
            <Image
              src="/imgs/tech/solar-residential4.jpg"
              alt="Solar Residential 4"
              fill
              className="object-cover rounded-lg"
            />
          </div>
        </div>

        <section className="mb-6 py-12">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-2">Battery System</h2>
            <div className="w-40 h-0.5 bg-red-600 mx-auto my-2"></div>
            <div className="text-sm text-center mb-12 text-gray-700">
              <p>Solar Battery Storage offers a more reliable energy system.</p>
            </div>
            <div className="space-y-6">
              <p className="text-gray-700 text-sm">
                In accordance with the definition of standards, we implement the relevant policies to achieve the following: To ensure the highest quality of service
              </p>
              <p className="text-gray-700 text-sm">
                Make everyone in the organisation aware of their responsibilities in maintaining and improving the quality of our products and service
              </p>
              <p className="text-gray-700 text-sm">
                To achieve and maintain a reputation and image of quality Commitment to the achievement of higher standards of customer satisfaction, consistent with professional standards and ethics as define by the professional bodies associated with the Quality Assurance Industry.
              </p>
            </div>
          </div>
        </section>

        {/* Horizontal Images */}
        <div className="grid grid-cols-3 gap-6">
          <div className="relative flex justify-center">
            <Image
              src="/imgs/tech/solar-residential-x.png"
              alt="Solar Residential 5"
              height={200}
              width={200}
              className="object-cover rounded-lg"
            />
          </div>
          <div className="relative flex justify-center">
            <Image
              src="/imgs/tech/solar-residential-s.png"
              alt="Solar Residential 6"
              height={200}
              width={200}
              className="object-contain rounded-lg"
            />
          </div>
          <div className="relative flex justify-center">
            <Image
              src="/imgs/tech/solar-residential-t.png"
              alt="Solar Residential 7"
              height={200}
              width={200}
              className="object-contain rounded-lg"
            />
          </div>
        </div>

      </div>
    </main>
  )
}

