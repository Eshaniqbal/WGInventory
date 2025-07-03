import { getCategories } from "@/lib/data";
import { CategoryDataTable } from "./components/data-table";
import { columns } from "./components/columns";

export default async function CategoriesPage() {
  const data = await getCategories();

  return (
    <div className="flex flex-col gap-8">
      <CategoryDataTable columns={columns} data={data} />
    </div>
  );
}
