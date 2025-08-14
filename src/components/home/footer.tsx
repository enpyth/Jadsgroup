"use client"

import Image from "next/image"
import Link from "next/link"
import { Phone, MapPin } from "lucide-react"
import { useLanguage } from "@/components/layout/language-context"

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="bg-cyan-950 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            {/* Updated logo without decorative outline */}
            <Image
              src="/logo.svg"
              alt="JADS Group Logo"
              width={80}
              height={40}
              className="object-contain"
            />
          </div>

          <div>
            <h4 className="font-semibold mb-4">{t("quickLinks")}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="flex items-center hover:text-red-300 transition-colors">
                  <span className="text-red-500 mr-2">▶</span> {t("home")}
                </Link>
              </li>
              <li>
                <Link href="/about" className="flex items-center hover:text-red-300 transition-colors">
                  <span className="text-red-500 mr-2">▶</span> {t("aboutUs")}
                </Link>
              </li>
              <li>
                <Link href="/mall" className="flex items-center hover:text-red-300 transition-colors">
                  <span className="text-red-500 mr-2">▶</span> {t("marketPlaza")}
                </Link>
              </li>
              <li>
                <Link href="/tech-microgrid" className="flex items-center hover:text-red-300 transition-colors">
                  <span className="text-red-500 mr-2">▶</span> {t("technology")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">{t("services")}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/project-management" className="flex items-center hover:text-red-300 transition-colors">
                  <span className="text-red-500 mr-2">▶</span> {t("projectManagement")}
                </Link>
              </li>
              <li>
                <Link href="/properties" className="flex items-center hover:text-red-300 transition-colors">
                  <span className="text-red-500 mr-2">▶</span> {t("propertyManagement")}
                </Link>
              </li>
              <li>
                <Link href="/strata-management" className="flex items-center hover:text-red-300 transition-colors">
                  <span className="text-red-500 mr-2">▶</span> {t("strataManagement")}
                </Link>
              </li>
              <li>
                <Link href="/tech-microgrid" className="flex items-center hover:text-red-300 transition-colors">
                  <span className="text-red-500 mr-2">▶</span> {t("technology")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">{t("contactInfo")}</h4>
            <div className="space-y-4 text-sm">
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2" />
                <span>(+61) 8212 8866</span>
              </div>
              <div className="flex items-start">
                <MapPin className="h-4 w-4 mr-2 mt-1 flex-shrink-0" />
                <span>
                  Level 1, suite 3, 
                  <br />
                  61-63 Grote street,
                  <br />
                  Adelaide, South
                  <br />
                  Australia 5000
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center text-xs">
          <p>{t("copyright")}</p>
        </div>
      </div>
    </footer>
  )
}

