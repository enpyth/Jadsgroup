import { getOutgoingByLeaseId } from "@/db/queries/outgoings";
import OutgoingDetailPage from "@/features/outgoings/details-page";

type PageProps = {
    params: { leaseId: string } | Promise<{ leaseId: string }>;
};

export default async function OutgoingPage({ params }: PageProps) {
    const { leaseId } = await params;
    const leaseIdInt = parseInt(leaseId);

    if (isNaN(leaseIdInt)) {
        throw new Error(`Invalid leaseId: ${leaseId}`);
    }

    const outgoingData = await getOutgoingByLeaseId(leaseIdInt);
    return <OutgoingDetailPage outgoingData={outgoingData[0]} />;
}