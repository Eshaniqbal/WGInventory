import { z } from "zod";

export const categorySchema = z.object({
  name: z.string().min(2, {
    message: "Category name must be at least 2 characters.",
  }),
});

export const vendorSchema = z.object({
  name: z.string().min(2, {
    message: "Vendor name must be at least 2 characters.",
  }),
  contact: z.string().min(2, {
    message: "Contact information is required.",
  }),
});

export const inventoryItemSchema = z.object({
  name: z.string().min(2, {
    message: "Product name must be at least 2 characters.",
  }),
  categoryId: z.string({ required_error: "Please select a category." }),
  vendorId: z.string({ required_error: "Please select a vendor." }),
  quantity: z.coerce.number().int().min(0, { message: "Quantity must be a positive number." }),
  price: z.coerce.number().min(0, { message: "Price must be a positive number." }),
  fabric: z.string().min(2, { message: "Fabric is required." }),
  color: z.string().min(2, { message: "Color is required." }),
  size: z.string().min(1, { message: "Size is required." }),
});
