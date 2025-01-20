// Server Actions Debt

"use server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";

const DebtSchema = z.object({
  user: z.string().min(4),
  amount: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0),
});

export const saveAmount = async (prevState: any) => {
  const validateField = DebtSchema.safeParse(prevState);

  if (!validateField.success) {
    return {
      error: {
        amount: validateField.error.errors
          .filter((e) => e.path[0] === "amount")
          .map((e) => e.message),
        user: validateField.error.errors
          .filter((e) => e.path[0] === "user")
          .map((e) => e.message),
      },
    };
  }

  try {
    await prisma.debt.create({
      data: {
        users_id: validateField.data.user,
        amount: new Prisma.Decimal(
          validateField.data.amount.replace(/[^0-9.-]+/g, ""),
        ),
      },
    });

    // console.log("Data yang dikirim:", validateField.data);

    revalidatePath("/dashboard/debt");

    return { message: "Success" };
  } catch (error) {
    // console.error("Error creating debt:", error);
    return { error: { amount: ["Failed to create debt"] } };
  }
};

export const deleteDebt = async (id: string) => {
  try {
    await prisma.debt.delete({
      where: { id },
    });
    return { message: "Debt successfully deleted" };
  } catch (error) {
    // console.error(error);
    return { message: "Failed to delete debt" };
  } finally {
    revalidatePath("/dashboard/debt");
  }
};
