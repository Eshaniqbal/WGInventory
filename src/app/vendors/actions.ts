"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { addVendor, deleteVendor, updateVendor } from "@/lib/data";
import { vendorSchema } from "@/lib/schemas";

export async function createVendorAction(
  data: z.infer<typeof vendorSchema>
) {
  const validatedFields = vendorSchema.safeParse(data);
  if (!validatedFields.success) {
    return {
      error: "Invalid fields",
      details: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    await addVendor(validatedFields.data);
    revalidatePath("/vendors");
    revalidatePath("/inventory"); 
    return { success: "Vendor created successfully." };
  } catch (error) {
    return { error: "Failed to create vendor." };
  }
}

export async function updateVendorAction(
  id: string,
  data: z.infer<typeof vendorSchema>
) {
  const validatedFields = vendorSchema.safeParse(data);
  if (!validatedFields.success) {
    return {
      error: "Invalid fields",
      details: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    await updateVendor(id, validatedFields.data);
    revalidatePath("/vendors");
    revalidatePath("/inventory");
    return { success: "Vendor updated successfully." };
  } catch (error) {
    return { error: "Failed to update vendor." };
  }
}

export async function deleteVendorAction(id: string) {
  try {
    await deleteVendor(id);
    revalidatePath("/vendors");
    revalidatePath("/inventory");
    revalidatePath("/");
    return { success: "Vendor deleted successfully." };
  } catch (error) {
    return { error: "Failed to delete vendor. Make sure no inventory items are using it." };
  }
}
