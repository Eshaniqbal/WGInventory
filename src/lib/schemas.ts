import { z } from "zod";

export const categorySchema = z.object({
  name: z.string().min(2, {
    message: "Category name must be at least 2 characters.",
  }),
});

export const inventoryItemSchema = z.object({
  name: z.string().min(2, {
    message: "Product name must be at least 2 characters.",
  }),
  quantity: z.coerce.number().int().min(0, { message: "Quantity must be a positive number." }),
  price: z.coerce.number().min(0, { message: "Price must be a positive number." }),
  fabric: z.string().min(1, { message: "Fabric is required." }),
  color: z.string().min(1, { message: "Color is required." }),
  size: z.string().min(1, { message: "Size is required." }),
});
