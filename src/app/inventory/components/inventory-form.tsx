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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { inventoryItemSchema } from "@/lib/schemas";
import type { InventoryItemWithRelations, Category, Vendor } from "@/lib/types";
import { createItemAction, updateItemAction } from "../actions";
import { useToast } from "@/components/ui/use-toast";

type InventoryFormProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  item: InventoryItemWithRelations | null;
  categories: Category[];
  vendors: Vendor[];
};

type InventoryFormValues = z.infer<typeof inventoryItemSchema>;

export function InventoryForm({
  isOpen,
  setIsOpen,
  item,
  categories,
  vendors,
}: InventoryFormProps) {
  const { toast } = useToast();
  const form = useForm<InventoryFormValues>({
    resolver: zodResolver(inventoryItemSchema),
    defaultValues: {
      name: "",
      categoryId: "",
      vendorId: "",
      quantity: 0,
      price: 0,
      fabric: "",
      color: "",
      size: "",
    },
  });

  React.useEffect(() => {
    if (isOpen) {
      form.reset(
        item
          ? { ...item }
          : {
              name: "",
              categoryId: "",
              vendorId: "",
              quantity: 0,
              price: 0,
              fabric: "",
              color: "",
              size: "",
            }
      );
    }
  }, [isOpen, item, form]);

  const onSubmit = async (data: InventoryFormValues) => {
    const action = item
      ? updateItemAction(item.id, data)
      : createItemAction(data);
    
    const result = await action;

    if (result.success) {
      toast({
        title: "Success",
        description: result.success,
      });
      setIsOpen(false);
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: result.error,
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{item ? "Edit Item" : "Add New Item"}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Silk Saree" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat.id} value={cat.id}>
                            {cat.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="vendorId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Vendor</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a vendor" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {vendors.map((ven) => (
                          <SelectItem key={ven.id} value={ven.id}>
                            {ven.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantity</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.01" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
               <FormField
                control={form.control}
                name="fabric"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fabric</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Cotton" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="color"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Color</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Blue" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="size"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Size</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., M, L, XL" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

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
