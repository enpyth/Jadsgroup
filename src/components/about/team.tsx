"use client"

import Image from "next/image"
import { useLanguage } from "@/components/layout/language-context"

const teamMembers = [
  {
    id: 1,
    name: "David Wong",
    title: "Managing Director",
    image: "/about/head1.png",
    bio: "davidWongBio",
  },
  {
    id: 2,
    name: "Grace Wong",
    title: "Director",
    image: "/about/head2.png",
    bio: "graceWongBio",
  },
  {
    id: 3,
    name: "Andy Wong",
    title: "Director",
    image: "/about/head3.png",
    bio: "andyWongBio",
  }, 
  {
    id: 4,
    name: "Shirley Chen",
    title: "Administrator",
    image: "/about/head2.png",
    bio: "ShirleyBio",
  },
]

export default function TeamSection() {
  const { t } = useLanguage()

  const getBackgroundColor = (index: number) => {
    if (index === 1) return "bg-cyan-800 text-white"
    if (index % 2 === 0) return "bg-white"
    return "bg-red-600 text-white"
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-8 md:px-12 lg:px-16 max-w-7xl">
        <h2 className="text-3xl font-bold text-center mb-2">Meet the team</h2>
        <div className="w-40 h-0.5 bg-red-600 mx-auto mb-12"></div>

        <div className="space-y-16">
          {teamMembers.map((member, index) => (
            <div
              key={member.id}
              className={`flex flex-col ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} items-center gap-8 px-4`}
            >
              <div className="w-full md:w-1/3">
                <Image
                  src={member.image}
                  alt={member.name}
                  width={300}
                  height={300}
                  className="rounded-full mx-auto"
                />
              </div>
              <div className="w-full md:w-2/3">
                <div className={`p-8 rounded-lg ${getBackgroundColor(index)}`}>
                  <h3 className="text-2xl font-semibold">{member.name}</h3>
                  <p className="text-sm mb-4">{member.title}</p>
                  <p className={`${index === 1 || index % 2 !== 0 ? "text-white/90" : "text-gray-700"}`}>{t(member.bio)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

