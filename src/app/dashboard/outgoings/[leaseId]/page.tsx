import { getOutgoingByLeaseId } from "@/db/queries/outgoings";
import OutgoingDetailPage from "@/features/outgoings/details-page";
type PageProps = {
    params: Promise<{
        leaseId: string;
    }>;
};

export default async function OutgoingPage({ params }: PageProps) {
    const resolvedParams = await params;
    const leaseId = parseInt(resolvedParams.leaseId);
    const outgoingData = await getOutgoingByLeaseId(leaseId);
    return <OutgoingDetailPage outgoingData={outgoingData[0]} />;
}