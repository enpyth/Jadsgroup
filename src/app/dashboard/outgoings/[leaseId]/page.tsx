import { getOutgoingByLeaseId } from "@/db/queries/outgoings";
import { getTenantEmailByLeaseId } from "@/db/queries/leases";
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

    const [outgoingData, leaseData] = await Promise.all([
        getOutgoingByLeaseId(leaseIdInt),
        getTenantEmailByLeaseId(leaseIdInt)
    ]);

    return <OutgoingDetailPage 
        outgoingData={outgoingData[0]} 
        tenantEmail={leaseData[0].tenant_email}
    />;
}