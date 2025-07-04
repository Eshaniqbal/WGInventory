"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import type { InventoryItemWithRelations } from "@/lib/types";
import { InventoryForm } from "@/app/inventory/components/inventory-form";

interface DashboardActionsProps {
  // No props needed since categories are removed
}

export function DashboardActions({}: DashboardActionsProps) {
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
      />
    </>
  );
}
