"use client"

import { useState } from "react"
import Image from "next/image"
import { useLanguage } from "@/components/layout/language-context"
import Button from "@mui/material/Button"

type FormTab = "sales" | "leasing" | "general"

export default function ContactForm() {
  const { t } = useLanguage()
  const [activeTab, setActiveTab] = useState<FormTab>("sales")

  // Form state
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    email: "",
    address: "",
    microGrid: false,
    powerPurchase: false,
    freshGrowers: false,
    properties: false,
    message: "",
    verification: "",
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Handle input changes
  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value, type } = e.target
    if (type === "checkbox") {
      setForm((prev) => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked,
      }))
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }))
    }
  }

  // Handle form submit
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setSuccess(null)
    setError(null)
    try {
      const res = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          tab: activeTab,
          template: "contact-enquiry",
        }),
      })
      const data = await res.json()
      if (res.ok) {
        setSuccess(t("enquirySent"))
        setForm({
          name: "",
          mobile: "",
          email: "",
          address: "",
          microGrid: false,
          powerPurchase: false,
          freshGrowers: false,
          properties: false,
          message: "",
          verification: "",
        })
      } else {
        setError(data.error || t("enquiryFailed"))
      }
    } catch (err) {
      setError(t("enquiryFailed"))
    } finally {
      setLoading(false)
    }
  }

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
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder={t("namePlaceholder")}
              className="bg-white/10 border border-gray-400 p-2 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <input
              type="tel"
              name="mobile"
              value={form.mobile}
              onChange={handleChange}
              placeholder={t("mobilePlaceholder")}
              className="bg-white/10 border border-gray-400 p-2 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder={t("emailPlaceholder")}
              className="bg-white/10 border border-gray-400 p-2 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <input
              type="text"
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder={t("addressPlaceholder")}
              className="bg-white/10 border border-gray-400 p-2 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </form>

          {/* Checkboxes */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <label className="flex items-center text-sm cursor-pointer group">
              <input type="checkbox" name="microGrid" checked={form.microGrid} onChange={handleChange} className="mr-2 accent-red-600" />
              <span className="group-hover:text-red-300 transition-colors">{t("microGrid")}</span>
            </label>
            <label className="flex items-center text-sm cursor-pointer group">
              <input type="checkbox" name="powerPurchase" checked={form.powerPurchase} onChange={handleChange} className="mr-2 accent-red-600" />
              <span className="group-hover:text-red-300 transition-colors">{t("powerPurchase")}</span>
            </label>
            <label className="flex items-center text-sm cursor-pointer group">
              <input type="checkbox" name="freshGrowers" checked={form.freshGrowers} onChange={handleChange} className="mr-2 accent-red-600" />
              <span className="group-hover:text-red-300 transition-colors">{t("freshGrowers")}</span>
            </label>
            <label className="flex items-center text-sm cursor-pointer group">
              <input type="checkbox" name="properties" checked={form.properties} onChange={handleChange} className="mr-2 accent-red-600" />
              <span className="group-hover:text-red-300 transition-colors">{t("properties")}</span>
            </label>
          </div>

          {/* Message */}
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder={t("messagePlaceholder")}
            rows={4}
            className="w-full bg-white/10 border border-gray-400 p-2 text-white placeholder-gray-300 mb-4 focus:outline-none focus:ring-2 focus:ring-red-500"
          ></textarea>

          {/* TODO Verification */}


          {/* Feedback */}
          {loading && <div className="text-center text-yellow-300 mb-2">{t("sending")}</div>}
          {success && <div className="text-center text-green-400 mb-2">{success}</div>}
          {error && <div className="text-center text-red-400 mb-2">{error}</div>}

          <div className="text-center">
            <Button
              onClick={handleSubmit}
              variant="contained"
              color="error"
              disabled={loading}
              sx={{ px: 4, py: 1.5, borderRadius: 2, fontWeight: "bold" }}
            >
              {loading ? t("sending") : t("sendEnquiry")}
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

