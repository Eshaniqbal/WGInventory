import { getInventoryItems, getCategories, getVendors } from "@/lib/data";
import { InventoryDataTable } from "./components/data-table";
import { columns } from "./components/columns";
import { PageHeader } from "@/components/page-header";

export default async function InventoryPage() {
  const data = await getInventoryItems();
  const categories = await getCategories();
  const vendors = await getVendors();

  return (
    <div className="flex flex-col gap-8">
      <InventoryDataTable columns={columns} data={data} categories={categories} vendors={vendors} />
    </div>
  );
}
