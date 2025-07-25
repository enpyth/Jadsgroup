import { DataTable as ProductTable } from '@/components/ui/table/data-table';
import { columns } from './product-tables/columns_landowner';
import { getAllOwners } from '@/db/queries/properties';

export default async function ListingLandowner() {
  const owners = await getAllOwners();
  const landowners = owners.map((owner: any) => ({
    id: owner.owner_id,
    owner_id: owner.owner_id,
    name: owner.name,
    phone: owner.phone,
    email: owner.email,
    address: owner.address,
    company: typeof owner.company === 'string' ? owner.company : (owner.company?.name || ''),
    created_at: new Date(owner.created_at).toLocaleString('en-AU', { timeZone: 'Australia/Adelaide' }),
  }));

  return (
    <ProductTable
      columns={columns}
      data={landowners}
      totalItems={landowners.length}
      url={'/dashboard/landowner/:id'}
    />
  );
} 