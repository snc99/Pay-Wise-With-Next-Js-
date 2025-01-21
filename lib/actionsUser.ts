// Server Actions User

"use server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

const UserSchema = z.object({
  name: z
    .string()
    .nonempty("Nama telepon harus diisi.")
    .min(3, "Nama harus memiliki minimal 3 karakter."),
  phone: z
    .string()
    .nonempty("Nomor telepon harus diisi.")
    .regex(/^[0-9]+$/, "Nomor telepon harus berupa angka.")
    .min(10, "Nomor telepon harus memiliki minimal 10 angka.")
    .max(14, "Nomor telepon harus memiliki maksimal 14 angka."),
});

export const saveUser = async (formData: FormData) => {
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
    revalidatePath("/dashboard/users");

    return { success: true, message: "User berhasil dibuat" };
  } catch (error) {
    return { success: false, message: "Gagal membuat user" };
  }
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

    revalidatePath("/dashboard/users");

    return { success: true, message: "User berhasil diupdate" };
  } catch (error: any) {
    // console.error("Error update user:", error);
    return {
      success: false,
      message: "Failed to update user",
      error: error.message,
    };
  }
};

export const deleteUser = async (id: string) => {
  try {
    await prisma.users.delete({
      where: { id },
    });

    return { message: "User successfully deleted" };
  } catch (error) {
    // console.error(error);
    return { message: "Failed to delete user" };
  } finally {
    revalidatePath("/dashboard/users");
  }
};
