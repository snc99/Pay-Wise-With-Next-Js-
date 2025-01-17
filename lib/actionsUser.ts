// Server Actions User

"use server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const UserSchema = z.object({
  name: z.string().min(4),
  phone: z.string().min(10).max(14),
});

export const saveUser = async (prevState: any, formData: FormData) => {
  const validateField = UserSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );
  if (!validateField.success) {
    return { error: validateField.error.flatten().fieldErrors };
  }
  try {
    await prisma.users.create({
      data: {
        name: validateField.data.name,
        phone: validateField.data.phone,
      },
    });
  } catch (error) {
    return { message: "Failed to create user" };
  }
  revalidatePath("/dashboard/users");
  redirect("/dashboard/users");
};

export const updateUser = async (
  id: string,
  prevState: any,
  formData: FormData,
) => {
  const validateField = UserSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );
  if (!validateField.success) {
    return { error: validateField.error.flatten().fieldErrors };
  }
  try {
    await prisma.users.update({
      data: {
        name: validateField.data.name,
        phone: validateField.data.phone,
      },
      where: { id },
    });
  } catch (error) {
    return { message: "Failed to update user" };
  }
  revalidatePath("/dashboard/users");
  redirect("/dashboard/users");
};

export const deleteUser = async (id: string) => {
  try {
    await prisma.users.delete({
      where: { id },
    });
    return { message: "User successfully deleted" }; // Pastikan mengembalikan objek dengan message
  } catch (error) {
    console.error(error);
    return { message: "Failed to delete user" }; // Kembalikan pesan error jika gagal
  } finally {
    revalidatePath("/dashboard/users");
  }
};
