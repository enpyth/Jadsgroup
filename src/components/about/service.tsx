"use client"
import Image from "next/image"
import Link from "next/link"
import { useLanguage } from "@/components/layout/language-context"

export default function ServiceSection() {
  const { t } = useLanguage()

  return (
    <div className="my-16 max-w-5xl mx-auto py-10">
      <h2 className="text-2xl font-semibold mb-8 text-center">Our Services</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden group hover:shadow-lg transition-shadow">
          <div className="h-48 relative">
            <Image
              src="/imgs/projmanagement/1.jpg"
              alt="Project Management"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-3">{t("projectManagement")}</h3>
            {/* <p className="text-gray-600 mb-4">{t("projectManagementDesc")}</p> */}
            <Link
              href="/project-management"
              className="inline-block bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
            >
              {t("learnMore")}
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden group hover:shadow-lg transition-shadow">
          <div className="h-48 relative">
            <Image
              src="/imgs/stratamanagement/1.jpg"
              alt="Strata Management"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-3">{t("strataManagement")}</h3>
            {/* <p className="text-gray-600 mb-4">{t("strataManagementDesc")}</p> */}
            <Link
              href="/strata-management"
              className="inline-block bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
            >
              {t("learnMore")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
} 