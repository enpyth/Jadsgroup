import RentalApplicationForm from "@/features/app-form/rental-application-form"
import { getPropertyById } from "@/db/queries/properties"
import { notFound, redirect } from "next/navigation"
import { auth } from "@/lib/auth"
import { User } from "next-auth"
import { Property } from "@/constants/data"

type PageProps = {
    params: { appId: string } | Promise<{ appId: string }>;
}

export default async function PropertyApplicationPage({ params }: PageProps) {
    const session = await auth()
    if (!session) {
        redirect("/login")
    }

    const { appId } = await params;
    const appIdInt = parseInt(appId);

    if (isNaN(appIdInt)) {
        throw new Error(`Invalid appId: ${appId}`);
    }

const property = await getPropertyById(appIdInt)

    if (!property || property.length === 0) {
        notFound()
    }

    return (
        <main className="container mx-auto py-10 px-4">
            <h1 className="text-3xl font-bold text-center mb-8">Property Rental Application</h1>
            <RentalApplicationForm user={session.user as User} property={property[0] as Property} />
        </main>
    )
}
