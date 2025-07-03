"use client";

import * as React from "react";
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { getColumns } from "./columns";
import type { Category } from "@/lib/types";
import { PageHeader } from "@/components/page-header";
import { CategoryForm } from "./category-form";
import { PlusCircle } from "lucide-react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function CategoryDataTable<TData extends Category, TValue>({
  data,
}: DataTableProps<TData, TValue>) {
  const [isFormOpen, setIsFormOpen] = React.useState(false);
  const [selectedCategory, setSelectedCategory] = React.useState<TData | null>(null);

  const openForm = React.useCallback((category: TData | null = null) => {
    setSelectedCategory(category);
    setIsFormOpen(true);
  }, []);

  const columns = React.useMemo(() => getColumns(openForm), [openForm]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div>
      <PageHeader
        title="Categories"
        description="Manage your product categories."
        actions={
          <Button onClick={() => openForm()}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New Category
          </Button>
        }
      />
      <div className="mt-4 rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <CategoryForm
        isOpen={isFormOpen}
        setIsOpen={setIsFormOpen}
        category={selectedCategory}
      />
    </div>
  );
}
