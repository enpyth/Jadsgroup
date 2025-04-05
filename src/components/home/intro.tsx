"use client"

import { useLanguage } from "@/components/layout/language-context"

export default function CompanyIntro() {
  const { t } = useLanguage()

  return (
    <section className="py-12 container mx-auto px-4">
      <p className="text-gray-700 max-w-4xl mx-auto text-center">
        {t("companyIntro")}
      </p>
    </section>
  )
}
