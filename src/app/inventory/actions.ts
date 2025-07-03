"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { addInventoryItem, deleteInventoryItem, updateInventoryItem } from "@/lib/data";
import { inventoryItemSchema } from "@/lib/schemas";

export async function createItemAction(
  data: z.infer<typeof inventoryItemSchema>
) {
  const validatedFields = inventoryItemSchema.safeParse(data);
  if (!validatedFields.success) {
    return {
      error: "Invalid fields",
      details: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    await addInventoryItem(validatedFields.data);
    revalidatePath("/inventory");
    revalidatePath("/");
    return { success: "Item created successfully." };
  } catch (error) {
    return { error: "Failed to create item." };
  }
}

export async function updateItemAction(
  id: string,
  data: z.infer<typeof inventoryItemSchema>
) {
  const validatedFields = inventoryItemSchema.safeParse(data);
  if (!validatedFields.success) {
    return {
      error: "Invalid fields",
      details: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    await updateInventoryItem(id, validatedFields.data);
    revalidatePath("/inventory");
    revalidatePath("/");
    return { success: "Item updated successfully." };
  } catch (error) {
    return { error: "Failed to update item." };
  }
}

export async function deleteItemAction(id: string) {
  try {
    await deleteInventoryItem(id);
    revalidatePath("/inventory");
    revalidatePath("/");
    return { success: "Item deleted successfully." };
  } catch (error) {
    return { error: "Failed to delete item." };
  }
}
