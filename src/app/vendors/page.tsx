import { getVendors } from "@/lib/data";
import { VendorDataTable } from "./components/data-table";
import { columns } from "./components/columns";

export default async function VendorsPage() {
  const data = await getVendors();

  return (
    <div className="flex flex-col gap-8">
      <VendorDataTable columns={columns} data={data} />
    </div>
  );
}
