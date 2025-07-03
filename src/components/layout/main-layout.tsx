"use client";

import { cn } from "@/lib/utils";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";
import { SidebarNav } from "./sidebar-nav";
import { Button } from "../ui/button";
import { Package2 } from "lucide-react";

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <Button variant="ghost" className="h-10 w-full justify-start px-2 text-lg font-bold">
            <Package2 className="mr-2 h-6 w-6" />
            WG Inventory
          </Button>
        </SidebarHeader>
        <SidebarContent>
          <SidebarNav />
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-14 items-center gap-4 border-b bg-background/80 backdrop-blur-sm px-6 sticky top-0 z-30 md:hidden">
          <SidebarTrigger />
          <h1 className="text-lg font-semibold">WG Inventory</h1>
        </header>
        <main className="flex-1 p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
