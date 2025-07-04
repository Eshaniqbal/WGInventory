"use client";

import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarTrigger,
  SidebarInset,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { SidebarNav } from "./sidebar-nav";
import { Button } from "../ui/button";
import { Package2 } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { LogoutButton } from "../logout-button";
import { getSession } from "@/lib/auth";

export function MainLayout({ children }: { children: React.ReactNode }) {
  let username = "";
  if (typeof window !== "undefined") {
    const session = getSession();
    username = session.username || "";
  }
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
        <SidebarFooter className="p-2">
          <div className="flex w-full flex-col items-center gap-2 group-data-[collapsible=icon]:p-2">
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <LogoutButton />
            </div>
            {username && (
              <div className="text-xs text-muted-foreground mt-1">Signed in as <span className="font-semibold">{username}</span></div>
            )}
          </div>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-14 items-center justify-between gap-4 border-b bg-background/80 backdrop-blur-sm px-6 sticky top-0 z-30 md:hidden">
          <div className="flex items-center gap-4">
            <SidebarTrigger />
            <h1 className="text-lg font-semibold">WG Inventory</h1>
          </div>
          <ThemeToggle />
        </header>
        <main className="flex-1 p-6">{children}</main>
        <footer className="w-full text-center text-xs text-muted-foreground py-4">
          Designed and developed by <a href="https://www.minmind.in" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">MinMind</a>
        </footer>
      </SidebarInset>
    </SidebarProvider>
  );
}
