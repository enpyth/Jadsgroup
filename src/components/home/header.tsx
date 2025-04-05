"use client"

import Image from "next/image"
import Link from "next/link"
import { useLanguage } from "@/components/layout/language-context"

export default function Header() {
  const { language, setLanguage, t } = useLanguage()

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "cn" : "en")
  }

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            {/* Logo without decorative outline */}
            <Image
              src="/logo.svg"
              alt="JADS Group Logo"
              width={60}
              height={40}
              className="object-contain"
            />

            {/* Navigation links in a single row */}
            <nav className="hidden md:block">
              <ul className="flex space-x-6 text-sm">
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
                <li>
                  <Link href="/tech" className="text-gray-700 hover:text-red-600 transition-colors whitespace-nowrap">
                    {t("technology")}
                  </Link>
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
          </div>

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

