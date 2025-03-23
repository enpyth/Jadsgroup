import { Lease } from '@/constants/data';
import { DataTable as ProductTable } from '@/components/ui/table/data-table';
import { columns } from './product-tables/columns_lease';
import { auth } from '@/lib/auth';
import { getAllLeases } from '@/db/queries/leases';

type ProductListingPage = {};

export default async function LeaseListingPage({ }: ProductListingPage) {
  const session = await auth();

  // different filter depends on current email
  const filterFunction = (property: any) => {
      return property.tenant_email === session?.user?.email;
  };

  // 筛选租户在数组中的产品
  const leases = await getAllLeases();
  const lease: Lease[] = leases
    .filter(filterFunction)
    .map(lease => ({
      lease_id: lease.lease_id,
      property_id: lease.property_id,
      tenant_email: lease.tenant_email,
      start_date: lease.start_date, //new Date().toISOString(),
      end_date: new Date().toISOString(),
      rent_amount: lease.rent_amount,
      deposit_amount: lease.deposit_amount,
      stage: lease.stage,
      agreement_to_lease: lease.agreement_to_lease
    }));
    
  console.log("---------------")
  console.log(leases)
  

  return (
    <ProductTable
      columns={columns}
      data={lease}
      totalItems={lease.length}
    />
  );
}
