"use client"

import Image from "next/image"
import Link from "next/link"
import { useLanguage } from "@/components/layout/language-context"
import { useState, useRef } from "react"
import { usePathname } from "next/navigation"
import { ChevronDown } from "lucide-react"

export default function Header() {
  const { language, setLanguage, t } = useLanguage()
  const dropdownRef = useRef<HTMLLIElement>(null)
  const pathname = usePathname()
  const [techDropdownOpen, setTechDropdownOpen] = useState(false)

  const techLinks = [
    {
      titleKey: "tech_title_microgrid",
      descKey: "tech_desc_microgrid",
      href: "/tech-microgrid"
    },
    {
      titleKey: "tech_title_commercial",
      descKey: "tech_desc_commercial",
      href: "/tech-solar-commercial"
    },
    {
      titleKey: "tech_title_residential",
      descKey: "tech_desc_residential",
      href: "/tech-solar-residential"
    }
  ]

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "cn" : "en")
  }
  const isActive = (path: string) => {
    return pathname === path
  }
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Image
            src="/logo.svg"
            alt="JADS Group Logo"
            width={60}
            height={40}
            className="object-contain -mb-3"
          />

          {/* Navigation links in a single row */}
          <nav className="hidden md:block flex-1">
            <ul className="flex items-center justify-center space-x-6 text-sm">
              <li>
                <Link href="/" className="text-gray-700 hover:text-red-600 font-medium whitespace-nowrap">
                  {t("home")}
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-700 hover:text-red-600 transition-colors whitespace-nowrap">
                  {t("aboutUs")}
                </Link>
              </li>
              <li>
                <Link href="/properties" className="text-gray-700 hover:text-red-600 transition-colors whitespace-nowrap">
                  {t("property")}
                </Link>
              </li>
              <li className="relative" ref={dropdownRef}>
                <button
                  className={`flex items-center whitespace-nowrap ${isActive("/technology") ||
                      isActive("/tech-microgrid") ||
                      isActive("/tech-solar-commercial") ||
                      isActive("/tech-solar-residential")
                      ? "text-red-600 font-medium"
                      : "text-gray-700 hover:text-red-600 transition-colors"
                    }`}
                  onMouseEnter={() => setTechDropdownOpen(true)}
                  onClick={() => setTechDropdownOpen(!techDropdownOpen)}
                >
                  {t("technology")}
                  <ChevronDown className="ml-1 h-4 w-4" />
                </button>

                {/* Technology Dropdown */}
                {techDropdownOpen && (
                  <div
                    className="absolute left-1/2 -translate-x-1/2 mt-2 w-[800px] bg-white/60 backdrop-blur-sm shadow-lg rounded-md overflow-hidden z-50"
                    onMouseLeave={() => setTechDropdownOpen(false)}
                  >
                    <div className="flex justify-center">
                      {techLinks.map((link, index) => (
                        <Link key={index} href={link.href} className="block hover:bg-gray-100/80 flex-1 group">
                          <div className="p-4 border-r last:border-r-0 border-gray-100 h-full text-center">
                            <h3 className="font-bold text-gray-900 group-hover:text-red-600 transition-colors mb-1">
                              {t(link.titleKey)}
                            </h3>
                            <p className="text-xs text-gray-600 group-hover:text-red-600/90 transition-colors">
                              {t(link.descKey)}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </li>
              <li>
                <Link href="/mall" className="text-gray-700 hover:text-red-600 transition-colors whitespace-nowrap">
                  {t("marketPlaza")}
                </Link>
              </li>
              <li>
                <Link href="/events" className="text-gray-700 hover:text-red-600 transition-colors whitespace-nowrap">
                  {t("events")}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-700 hover:text-red-600 transition-colors whitespace-nowrap">
                  {t("contactUs")}
                </Link>
              </li>
            </ul>
          </nav>

          <div className="flex items-center gap-4 text-xs">
            <Link href="#" className="text-gray-600 hover:text-red-600 transition-colors">
              {t("signIn")}
            </Link>
            <button
              onClick={toggleLanguage}
              className="text-gray-600 hover:text-red-600 transition-colors cursor-pointer"
            >
              {language === "en" ? "CN" : "EN"}
            </button>
          </div>
        </div>

        {/* Mobile navigation - only visible on small screens */}
        <nav className="md:hidden mt-3 border-t border-gray-100 pt-2">
          <ul className="flex space-x-4 overflow-x-auto py-1 text-sm">
            <li>
              <Link href="#" className="text-red-600 font-medium whitespace-nowrap">
                {t("home")}
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-700 whitespace-nowrap">
                {t("aboutUs")}
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-700 whitespace-nowrap">
                {t("property")}
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-700 whitespace-nowrap">
                {t("technology")}
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-700 whitespace-nowrap">
                {t("export")}
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-700 whitespace-nowrap">
                {t("marketPlaza")}
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-700 whitespace-nowrap">
                {t("events")}
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-700 whitespace-nowrap">
                {t("contactUs")}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

