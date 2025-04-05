"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useLanguage } from "@/components/layout/language-context"

interface Slide {
    id: number
    image: string
    title: string
    contents: string[]
}

interface CarouselCardProps {
    slides: Slide[]
}

const AUTO_PLAY_INTERVAL = 5000

export default function CarouselCard({ slides }: CarouselCardProps) {
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
            <div className="container mx-auto">
                <div className="relative max-w-4xl mx-auto overflow-hidden">
                    <div
                        className="flex transition-transform duration-1000 ease-out will-change-transform"
                        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                    >
                        {slides.map((slide, index) => (
                            <div
                                key={slide.id}
                                className="w-full flex-shrink-0"
                            >
                                <div className="flex flex-col md:flex-row items-center">
                                    <div className="w-full md:w-full relative aspect-[4/3]">
                                        <Image
                                            src={slide.image}
                                            alt={t(slide.title)}
                                            fill
                                            className="rounded-md shadow-lg object-cover"
                                        />
                                    </div>
                                    <div className="w-full md:w-3/5 bg-white/60 backdrop-blur-sm p-8 rounded-md shadow-lg md:-ml-16 mt-4 md:mt-0 relative z-20">
                                        <h3 className="text-lg font-bold mb-4 text-gray-900">{t(slide.title)}</h3>
                                        <div className="space-y-4">
                                            {slide.contents.map((content, i) => (
                                                <p key={i} className="text-sm text-gray-700">{t(content)}</p>
                                            ))}
                                        </div>
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
                                className={`w-3 h-3 rounded-full transition-colors ${index === currentSlide ? "bg-red-600" : "bg-gray-300"}`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

