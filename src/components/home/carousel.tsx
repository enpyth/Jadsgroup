"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Link } from "lucide-react"
import { useLanguage } from "@/components/layout/language-context"
import { Button } from "@mui/material"
import NextLink from "next/link"

const slides = [
  {
    id: 1,
    image: "/carousel/carousel1.jpg",
    title: "strataManagement",
    subtitle: "ourActivities",
    href: "/strata-management"
  },
  {
    id: 2,
    image: "/carousel/carousel2.jpg",
    title: "property",
    subtitle: "ourActivities",
    href: "/properties"
  },
  {
    id: 3,
    image: "/carousel/carousel3.jpg",
    title: "marketPlaza",
    subtitle: "ourActivities",
    href: "/mall"
  },
]

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const { t } = useLanguage()

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
  }

  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative h-[500px]">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-950/100 to-stone-900/10 z-10"></div>
          <Image src={slide.image} alt={t(slide.title)} fill className="object-cover" />
          <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-end pb-16">
            <div className="text-white">
              <p className="text-sm mb-1">{t(slide.subtitle)}</p>
              <h1 className="text-4xl font-bold mb-4">{t(slide.title)}</h1>
              <Button
                variant="contained"
                color="error"
                href={slide.href}
                sx={{
                  textTransform: 'none',
                  fontSize: '0.75rem',
                  padding: '0.5rem 1rem',
                  backgroundColor: '#dc2626',
                  '&:hover': {
                    backgroundColor: '#b91c1c',
                  },
                }}
              >
                {t("learnMore")}
              </Button>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 text-white p-2 rounded-full hover:bg-black/50 transition-colors"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 text-white p-2 rounded-full hover:bg-black/50 transition-colors"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full ${index === currentSlide ? "bg-white" : "bg-white/50"}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}

