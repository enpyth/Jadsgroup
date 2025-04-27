"use client"

import { useState } from "react"
import Image from "next/image"
import { useLanguage } from "@/components/layout/language-context"

type FormTab = "sales" | "leasing" | "general"

export default function ContactForm() {
  const { t } = useLanguage()
  const [activeTab, setActiveTab] = useState<FormTab>("sales")

  return (
    <section className="relative py-16 bg-blue-900 text-white">
      <div className="absolute inset-0 bg-gradient-to-r from-stone-900/40 to-slate-800/80 z-10"></div>
      <Image src="/home/contact-bg.jpg" alt="Contact background" fill className="object-cover" />
      <div className="relative z-20 container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2">{t("contactTitle")}</h2>
          <p className="text-lg mb-1">{t("callUs")}</p>
          <p className="text-sm">{t("agentsHelp")}</p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Form Tabs */}
          <div className="grid grid-cols-3 gap-2 mb-6">
            <button
              onClick={() => setActiveTab("sales")}
              className={`py-2 text-sm transition-colors ${
                activeTab === "sales"
                  ? "bg-red-600 text-white"
                  : "bg-transparent border border-gray-400 text-white hover:bg-white/10"
              }`}
            >
              {t("sales")}
            </button>
            <button
              onClick={() => setActiveTab("leasing")}
              className={`py-2 text-sm transition-colors ${
                activeTab === "leasing"
                  ? "bg-red-600 text-white"
                  : "bg-transparent border border-gray-400 text-white hover:bg-white/10"
              }`}
            >
              {t("leasing")}
            </button>
            <button
              onClick={() => setActiveTab("general")}
              className={`py-2 text-sm transition-colors ${
                activeTab === "general"
                  ? "bg-red-600 text-white"
                  : "bg-transparent border border-gray-400 text-white hover:bg-white/10"
              }`}
            >
              {t("generalEnquiry")}
            </button>
          </div>

          {/* Form */}
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <input
              type="text"
              placeholder={t("namePlaceholder")}
              className="bg-white/10 border border-gray-400 p-2 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <input
              type="tel"
              placeholder={t("mobilePlaceholder")}
              className="bg-white/10 border border-gray-400 p-2 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <input
              type="email"
              placeholder={t("emailPlaceholder")}
              className="bg-white/10 border border-gray-400 p-2 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <input
              type="text"
              placeholder={t("addressPlaceholder")}
              className="bg-white/10 border border-gray-400 p-2 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </form>

          {/* Checkboxes */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <label className="flex items-center text-sm cursor-pointer group">
              <input type="checkbox" className="mr-2 accent-red-600" />
              <span className="group-hover:text-red-300 transition-colors">{t("microGrid")}</span>
            </label>
            <label className="flex items-center text-sm cursor-pointer group">
              <input type="checkbox" className="mr-2 accent-red-600" />
              <span className="group-hover:text-red-300 transition-colors">{t("powerPurchase")}</span>
            </label>
            <label className="flex items-center text-sm cursor-pointer group">
              <input type="checkbox" className="mr-2 accent-red-600" />
              <span className="group-hover:text-red-300 transition-colors">{t("freshGrowers")}</span>
            </label>
            <label className="flex items-center text-sm cursor-pointer group">
              <input type="checkbox" className="mr-2 accent-red-600" />
              <span className="group-hover:text-red-300 transition-colors">{t("properties")}</span>
            </label>
          </div>

          {/* Message */}
          <textarea
            placeholder={t("messagePlaceholder")}
            rows={4}
            className="w-full bg-white/10 border border-gray-400 p-2 text-white placeholder-gray-300 mb-4 focus:outline-none focus:ring-2 focus:ring-red-500"
          ></textarea>

          {/* Verification */}
          <div className="flex justify-between items-center mb-6">
            <input
              type="text"
              placeholder={t("verificationCode")}
              className="bg-white/10 border border-gray-400 p-2 text-white placeholder-gray-300 w-1/2 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            {/* <div className="bg-white p-1 rounded">
              <Image src="/placeholder.svg?height=40&width=100" alt="Captcha" width={100} height={40} />
            </div> */}
          </div>

          <div className="text-center">
            <button className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition-colors">
              {t("sendEnquiry")}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

