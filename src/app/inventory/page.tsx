import { getInventoryItems } from "@/lib/data";
import { InventoryDataTable } from "./components/data-table";
import { columns } from "./components/columns";
import { PageHeader } from "@/components/page-header";
import { AuthGuard } from "@/components/auth-guard";
import { MainLayout } from "@/components/layout/main-layout";

export default async function InventoryPage() {
  const data = await getInventoryItems();

  return (
    <AuthGuard>
      <MainLayout>
        <div className="p-8">
          <InventoryDataTable columns={columns} data={data} />
        </div>
      </MainLayout>
    </AuthGuard>
  );
}
