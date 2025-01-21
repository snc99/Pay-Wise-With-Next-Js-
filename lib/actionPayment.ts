"use server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";

const PaymentSchema = z.object({
  debt: z.string().min(1, { message: "ID Hutang wajib diisi" }), // ID Debt yang terkait
  amountPaid: z
    .string()
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Jumlah pembayaran harus berupa angka positif",
    }),
});

export const savePayment = async (paymentData: any) => {
  // Validasi input
  const validateField = PaymentSchema.safeParse(paymentData);

  if (!validateField.success) {
    return {
      error: {
        amountPaid: validateField.error.errors
          .filter((e) => e.path[0] === "amountPaid")
          .map((e) => e.message),
        debt: validateField.error.errors
          .filter((e) => e.path[0] === "debt")
          .map((e) => e.message),
      },
    };
  }
  console.log("Data validasi pembayaran:", validateField.data); // Log data
  const { debt, amountPaid } = validateField.data;
  console.log("Received debt ID:", debt); // Memastikan debt diterima dengan benar
  console.log("Received amountPaid:", amountPaid);

  try {
    const { debt, amountPaid } = validateField.data;

    // Cari data hutang terkait
    console.log("Received debt ID:", debt);
    const relatedDebt = await prisma.debt.findFirst({
      where: { users_id: debt },
    });
    console.log("Related debt found:", relatedDebt);

    if (!relatedDebt) {
      return { error: { debt: ["Data hutang tidak ditemukan"] } };
    }

    // Hitung sisa pembayaran
    const remainingAmount = relatedDebt.amount.sub(
      new Prisma.Decimal(amountPaid.replace(/[^0-9.-]+/g, "")),
    );

    if (remainingAmount.lt(0)) {
      return {
        error: {
          amountPaid: ["Jumlah pembayaran melebihi sisa hutang"],
        },
      };
    }

    // Simpan data pembayaran
    await prisma.payment.create({
      data: {
        debt_record_id: relatedDebt.id, // Pastikan ini adalah ID yang valid
        amount_paid: amountPaid.toString(), // Pastikan tipe data string
        remaining_amount: remainingAmount, // Decimal untuk remaining_amount
        payment_date: new Date(), // Tanggal pembayaran saat ini
      },
    });

    // Perbarui sisa hutang terkait
    await prisma.debt.update({
      where: { id: relatedDebt.id },
      data: {
        amount: remainingAmount,
      },
    });

    // Revalidate path untuk memperbarui data di UI
    revalidatePath("/dashboard/payment");

    return { message: "Pembayaran berhasil dibuat" };
  } catch (error) {
    console.error("Error membuat pembayaran:", error);
    return { error: { amountPaid: ["Gagal membuat pembayaran"] } };
  }
};
