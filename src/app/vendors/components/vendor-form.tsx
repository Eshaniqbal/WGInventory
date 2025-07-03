"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { vendorSchema } from "@/lib/schemas";
import type { Vendor } from "@/lib/types";
import { createVendorAction, updateVendorAction } from "../actions";
import { useToast } from "@/components/ui/use-toast";

type VendorFormProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  vendor: Vendor | null;
};

type VendorFormValues = z.infer<typeof vendorSchema>;

export function VendorForm({
  isOpen,
  setIsOpen,
  vendor,
}: VendorFormProps) {
  const { toast } = useToast();
  const form = useForm<VendorFormValues>({
    resolver: zodResolver(vendorSchema),
    defaultValues: { name: "", contact: "" },
  });

  React.useEffect(() => {
    if (isOpen) {
      form.reset(vendor ? { ...vendor } : { name: "", contact: "" });
    }
  }, [isOpen, vendor, form]);

  const onSubmit = async (data: VendorFormValues) => {
    const action = vendor
      ? updateVendorAction(vendor.id, data)
      : createVendorAction(data);

    const result = await action;

    if (result.success) {
      toast({ title: "Success", description: result.success });
      setIsOpen(false);
    } else {
      toast({ variant: "destructive", title: "Error", description: result.error });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{vendor ? "Edit Vendor" : "Add New Vendor"}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vendor Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Fabricorp" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="contact"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Info</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., sales@fabricorp.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? "Saving..." : "Save"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
