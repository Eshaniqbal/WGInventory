"use client";

import * as React from "react";
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { DataTablePagination } from "@/components/data-table/data-table-pagination";
import { getColumns } from "./columns";
import type { InventoryItemWithRelations, Category } from "@/lib/types";
import { PageHeader } from "@/components/page-header";
import { InventoryForm } from "./inventory-form";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { addInventoryItem } from "@/lib/data";
import { useToast } from "@/hooks/use-toast";
import Papa from "papaparse";
import { useRouter } from "next/navigation";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function InventoryDataTable<TData extends InventoryItemWithRelations, TValue>({
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = React.useState({});
  const [isFormOpen, setIsFormOpen] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState<TData | null>(null);
  const [isBulkOpen, setIsBulkOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const { toast } = useToast();
  const router = useRouter();

  const openForm = React.useCallback((item: TData | null = null) => {
    setSelectedItem(item);
    setIsFormOpen(true);
  }, []);

  const columns = React.useMemo(() => getColumns(openForm), [openForm]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      rowSelection,
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleBulkSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: async (results) => {
        let success = 0;
        let fail = 0;
        for (const row of results.data as any[]) {
          try {
            // Validate required fields
            if (!row.name || !row.quantity || !row.price || !row.fabric || !row.color || !row.size) {
              fail++;
              continue;
            }
            await fetch("/api/inventory/bulk-upload", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(row),
            });
            success++;
          } catch {
            fail++;
          }
        }
        toast({
          title: "Bulk Upload Complete",
          description: `${success} items added, ${fail} failed.`,
        });
        setIsBulkOpen(false);
        setFile(null);
        router.refresh();
      },
      error: () => {
        toast({ title: "Error", description: "Failed to parse CSV." });
      },
    });
  };

  const sampleCsv = `name,quantity,price,fabric,color,size\nSample Product,10,99.99,Cotton,Blue,M`;

  return (
    <div>
      <PageHeader
        title="Inventory"
        description="Manage your product stock."
        actions={
          <div className="flex flex-col gap-2 sm:flex-row sm:gap-2">
            <Button onClick={() => openForm()} className="w-full sm:w-auto">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add New Item
            </Button>
            <Button onClick={() => setIsBulkOpen(true)} variant="outline" className="w-full sm:w-auto">
              Bulk Upload
            </Button>
          </div>
        }
      />
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter products..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm w-full"
        />
      </div>
      <div className="rounded-md border overflow-x-auto">
        <Table className="min-w-[600px]">
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
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
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
      <div className="py-4">
        <DataTablePagination table={table} />
      </div>
      <InventoryForm
        isOpen={isFormOpen}
        setIsOpen={setIsFormOpen}
        item={selectedItem}
      />
      <Dialog open={isBulkOpen} onOpenChange={setIsBulkOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Bulk Upload Inventory (CSV)</DialogTitle>
          </DialogHeader>
          <div className="mb-2">
            <a
              href={`data:text/csv;charset=utf-8,${encodeURIComponent(sampleCsv)}`}
              download="inventory-sample.csv"
              className="text-blue-600 underline text-sm"
            >
              Download sample CSV
            </a>
          </div>
          <form onSubmit={handleBulkSubmit} className="space-y-4">
            <Input type="file" accept=".csv" onChange={handleFileChange} />
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit" disabled={!file}>Upload</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
