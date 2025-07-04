"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { addCategory, deleteCategory, updateCategory, getCategories } from "@/lib/data";
import { categorySchema } from "@/lib/schemas";

export async function createCategoryAction(
  data: z.infer<typeof categorySchema>
) {
  const validatedFields = categorySchema.safeParse(data);
  if (!validatedFields.success) {
    return {
      error: "Invalid fields",
      details: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    await addCategory(validatedFields.data);
    revalidatePath("/categories");
    revalidatePath("/inventory"); // Revalidate inventory in case category names changed
    return { success: "Category created successfully." };
  } catch (error) {
    return { error: "Failed to create category." };
  }
}

export async function updateCategoryAction(
  id: string,
  data: z.infer<typeof categorySchema>
) {
  const validatedFields = categorySchema.safeParse(data);
  if (!validatedFields.success) {
    return {
      error: "Invalid fields",
      details: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    await updateCategory(id, validatedFields.data);
    revalidatePath("/categories");
    revalidatePath("/inventory");
    return { success: "Category updated successfully." };
  } catch (error) {
    return { error: "Failed to update category." };
  }
}

export async function deleteCategoryAction(id: string) {
  try {
    await deleteCategory(id);
    revalidatePath("/categories");
    revalidatePath("/inventory");
    revalidatePath("/");
    return { success: "Category deleted successfully." };
  } catch (error) {
    return { error: "Failed to delete category. Make sure no inventory items are using it." };
  }
}
