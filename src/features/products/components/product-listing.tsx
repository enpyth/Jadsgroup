import { Product } from '@/constants/data';
import { searchParamsCache } from '@/lib/searchparams';
import { DataTable as ProductTable } from '@/components/ui/table/data-table';
import { columns } from './product-tables/columns';
import { auth } from '@/lib/auth';
import { getPropertyWithDetails } from '@/db/queries/properties'

type ProductListingPage = {};

export default async function ProductListingPage({ }: ProductListingPage) {
  const session = await auth();
  const cur_email = session?.user?.email || ""
  // Showcasing the use of search params cache in nested RSCs
  const page = searchParamsCache.get('page');
  const search = searchParamsCache.get('q');
  const pageLimit = searchParamsCache.get('limit');
  const categories = searchParamsCache.get('categories');

  // const filters = {
  //   page,
  //   limit: pageLimit,
  //   ...(search && { search }),
  //   ...(categories && { categories: categories })
  // };

  // const data = await fakeProducts.getProducts(filters);
  // const totalProducts = data.total_products;
  // const products: Product[] = data.products;

  // inner email set
  const emails = ["zhangsu1305@gmail.com", "admin@jadsgroup.com"]
  // different filter depends on current email
  const filterFunction = (property: any) => {
    if (!emails.includes(cur_email)) {
      // tenants
      return property.tenant_email === session?.user?.email;
    } else if (1) {
      // TODO
      return property.state === "available";
    } else {
      return false; // 默认不过滤
    }
  };

  // 筛选租户在数组中的产品
  const properties = await getPropertyWithDetails();
  const products: Product[] = properties
    // .filter(filterFunction)
    .map(property => ({
      id: property.property_id,
      name: property.name,
      description: property.description,
      price: property.price,
      size: property.size,
      image: property.image,
      state: property.state,
      release_time: new Date().toISOString(),
      category: "placeholder",
      owner: property.ownerName,
      agent: property.agentName,
    }));

  return (
    <ProductTable
      columns={columns}
      data={products}
      totalItems={products.length}
      url={"/dashboard/property/:id"}
    />
  );
}
