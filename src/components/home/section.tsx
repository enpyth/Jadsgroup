import Image from "next/image"

interface SectionProps {
    title: string
    content: string
    imageSrc: string
    imageAlt: string
    reverse?: boolean
    bgColor?: string
    textColor?: string
}

export default function Section({
    title,
    content,
    imageSrc,
    imageAlt,
    reverse = false,
    bgColor = "bg-white",
    textColor = "text-gray-700"
}: SectionProps) {
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
                <div className={`w-full md:w-1/2 py-20 px-12 flex flex-col justify-center ${bgColor} ${textColor}`}>
                    <h2 className="text-2xl font-bold mb-6">{title}</h2>
                    <p className="text-sm">{content}</p>
                </div>
            </div>
        </section>
    )
}