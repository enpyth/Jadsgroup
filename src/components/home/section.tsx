"use client"
import Image from "next/image"
import { useLanguage } from "@/components/layout/language-context"

interface SectionProps {
    title: string
    contents: string[]
    imageSrc: string
    imageAlt: string
    reverse?: boolean
    bgColor?: string
    textColor?: string
}

export default function ImgWithSection({
    title,
    contents,
    imageSrc,
    imageAlt,
    reverse = false,
    bgColor = "bg-white",
    textColor = "text-gray-700"
}: SectionProps) {
    const { t } = useLanguage()

    return (
        <section className="mb-16 overflow-hidden">
            <div className={`flex flex-col md:flex-row ${reverse ? "md:flex-row-reverse" : ""} h-full`}>
                <div className="w-full md:w-1/2 relative">
                    <Image
                        src={imageSrc}
                        alt={imageAlt}
                        fill={true}
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                    />
                </div>
                <div className={`w-full md:w-1/2 py-8 px-8 flex flex-col justify-center ${bgColor} ${textColor}`}>
                    {title && <h2 className="text-2xl font-bold my-6">{title}</h2>}
                    <div className="space-y-4 min-h-[150px] max-h-[250px] overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent hover:scrollbar-thumb-gray-500">
                        {contents.map((content, index) => (
                            <p key={index} className="text-sm">{t(content)}</p>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}