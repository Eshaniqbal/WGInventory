"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import type { Category, Vendor } from "@/lib/types";
import { InventoryForm } from "@/app/inventory/components/inventory-form";

interface DashboardActionsProps {
  categories: Category[];
  vendors: Vendor[];
}

export function DashboardActions({ categories, vendors }: DashboardActionsProps) {
  const [isFormOpen, setIsFormOpen] = React.useState(false);

  return (
    <>
      <Button onClick={() => setIsFormOpen(true)}>
        <PlusCircle className="mr-2 h-4 w-4" />
        Add New Item
      </Button>
      <InventoryForm
        isOpen={isFormOpen}
        setIsOpen={setIsFormOpen}
        item={null}
        categories={categories}
        vendors={vendors}
      />
    </>
  );
}
