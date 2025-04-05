"use client"

import { useLanguage } from "@/components/layout/language-context"

export default function PartnerSection() {
  const { t } = useLanguage()

  return (
    <section className="py-12 bg-red-600 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-lg">
          <h2 className="text-2xl font-bold mb-6">{t("partnerTitle")}</h2>
          <p className="mb-4 text-sm">{t("partnerDesc1")}</p>
          <p className="mb-6 text-sm">{t("partnerDesc2")}</p>
          <button className="bg-white text-red-600 text-xs px-4 py-2 rounded hover:bg-slate-700 hover:text-white transition-colors">
          {/* text-xs px-4 py-1 mt-auto transition-colors duration-300 bg-white text-red-600 border border-red-600 hover:bg-red-600 hover:text-white */}
            {t("findAgent")}
          </button>
        </div>
      </div>
    </section>
  )
}

