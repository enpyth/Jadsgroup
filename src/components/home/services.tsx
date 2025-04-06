"use client"

import { useLanguage } from "@/components/layout/language-context"
import { Home, Users, Package, ShoppingBag } from "lucide-react"
import Link from "next/link"

export default function ServicesGrid() {
  const { t } = useLanguage()

  const services = [
    {
      id: 1,
      title: "property",
      description: "propertyDesc",
      icon: Home,
      buttonVariant: "outline",
      href: "/properties"
    },
    {
      id: 2,
      title: "technology",
      description: "technologyDesc",
      icon: Users,
      buttonVariant: "outline",
      href: "/tech-solar-commercial"
    },
    {
      id: 3,
      title: "business",
      description: "businessDesc",
      icon: Package,
      buttonVariant: "outline",
      href: "/project-management"
    },
    {
      id: 4,
      title: "marketPlaza",
      description: "marketPlazaDesc",
      icon: ShoppingBag,
      buttonVariant: "outline",
      href: "/mall"
    },
  ]

  return (
    <section className="py-8 container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {services.map((service) => (
          <div
            key={service.id}
            className="flex flex-col items-center text-center group transition-all duration-300 hover:shadow-lg hover:-translate-y-1 rounded-lg p-4"
          >
            <h3 className="font-semibold text-xl mb-4">{t(service.title)}</h3>
            <div className="w-16 h-16 bg-white rounded-full border border-red-600 flex items-center justify-center mb-4 group-hover:bg-red-600 group-hover:text-white transition-colors duration-300">
              <service.icon className="h-8 w-8 text-red-600 group-hover:text-white transition-colors duration-300" />
            </div>
            <p className="text-sm text-gray-600 mb-4 group-hover:text-gray-800 transition-colors duration-300">
              {t(service.description)}
            </p>
            <Link
              href={service.href}
              className="text-xs px-4 py-1 mt-auto transition-colors duration-300 bg-white text-red-600 border border-red-600 hover:bg-red-600 hover:text-white rounded-md"
            >
              {t("more")}
            </Link>
          </div>
        ))}
      </div>
    </section>
  )
}

