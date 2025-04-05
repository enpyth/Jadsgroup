"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useLanguage } from "@/components/layout/language-context"

const slides = [
    {
        id: 1,
        image: "/about/intro1.jpg",
        content: "companyHistory1",
    },
    {
        id: 2,
        image: "/about/intro2.jpg",
        content: "companyHistory2",
    },
    {
        id: 3,
        image: "/about/intro3.jpg",
        content: "companyHistory3",
    },
]

const AUTO_PLAY_INTERVAL = 4000 // 5 seconds

export default function AboutIntro() {
    const [currentSlide, setCurrentSlide] = useState(0)
    const { t } = useLanguage()

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
        }, AUTO_PLAY_INTERVAL)

        return () => clearInterval(timer)
    }, [])


    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="relative max-w-6xl mx-auto overflow-hidden">
                    <div
                        className="flex transition-transform duration-1000 ease-out will-change-transform"
                        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                    >
                        {/* Carousel */}
                        {slides.map((slide, index) => (
                            <div
                                key={slide.id}
                                className="w-full flex-shrink-0"
                            >
                                <div className="flex flex-col md:flex-row items-center">
                                    <div className="w-full md:w-full relative aspect-[4/3]">
                                        <Image
                                            src={slide.image}
                                            alt={t(slide.content)}
                                            fill
                                            className="rounded-md shadow-lg object-cover"
                                        />
                                    </div>
                                    <div className="w-full md:w-3/5 bg-white/60 backdrop-blur-sm p-8 rounded-md shadow-lg md:-ml-16 mt-4 md:mt-0 relative z-20">
                                        <p className="text-gray-700 mb-6">{t(slide.content)}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-center space-x-2 mt-6">
                        {slides.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentSlide(index)}
                                className={`w-3 h-3 rounded-full transition-colors ${index === currentSlide ? "bg-red-600" : "bg-gray-300"
                                    }`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

