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
import { categorySchema } from "@/lib/schemas";
import type { Category } from "@/lib/types";
import { createCategoryAction, updateCategoryAction } from "../actions";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

type CategoryFormProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  category: Category | null;
};

type CategoryFormValues = z.infer<typeof categorySchema>;

export function CategoryForm({
  isOpen,
  setIsOpen,
  category,
}: CategoryFormProps) {
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: { name: "" },
  });

  React.useEffect(() => {
    if (isOpen) {
      form.reset({ name: category?.name ?? "" });
    }
  }, [isOpen, category, form]);

  const onSubmit = async (data: CategoryFormValues) => {
    const action = category
      ? updateCategoryAction(category.id, data)
      : createCategoryAction(data);

    const result = await action;

    if (result.success) {
      toast({ title: "Success", description: result.success });
      setIsOpen(false);
      router.refresh();
    } else {
      toast({ variant: "destructive", title: "Error", description: result.error });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{category ? "Edit Category" : "Add New Category"}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Suits" {...field} />
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
