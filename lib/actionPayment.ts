"use server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";

// Validasi data pembayaran
const PaymentSchema = z.object({
  debt: z.string().min(1, { message: "ID Hutang wajib diisi" }), // ID hutang yang terkait
  amountPaid: z
    .string()
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Jumlah pembayaran harus berupa angka positif",
    }),
});

export const savePayment = async (paymentData: any) => {
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

  const { debt, amountPaid } = validateField.data;

  try {
    console.log("Received user ID for payment:", debt);
    console.log("Received amountPaid:", amountPaid);

    // Cari semua catatan hutang pengguna
    const allDebts = await prisma.debt.findMany({
      where: { users_id: debt }, // Ambil semua hutang terkait pengguna
      orderBy: { createdAt: "asc" }, // Urutkan hutang berdasarkan waktu (prioritas lunas)
    });

    if (allDebts.length === 0) {
      return { error: { debt: ["Data hutang tidak ditemukan"] } };
    }

    console.log("All related debts found:", allDebts);

    // Hitung total pembayaran
    const paidAmountDecimal = new Prisma.Decimal(
      amountPaid.replace(/[^0-9.-]+/g, ""),
    );
    let remainingPayment = paidAmountDecimal;

    // Proses pembayaran untuk semua hutang
    for (const debt of allDebts) {
      if (remainingPayment.isZero()) break;

      const debtRemaining = debt.amount; // Sisa hutang pada catatan ini
      if (remainingPayment.greaterThanOrEqualTo(debtRemaining)) {
        // Jika pembayaran lebih besar atau sama dengan sisa hutang
        await prisma.debt.update({
          where: { id: debt.id },
          data: { amount: new Prisma.Decimal(0) }, // Hutang lunas
        });
        remainingPayment = remainingPayment.sub(debtRemaining);
      } else {
        // Jika pembayaran lebih kecil dari sisa hutang
        await prisma.debt.update({
          where: { id: debt.id },
          data: { amount: debtRemaining.sub(remainingPayment) }, // Kurangi sisa hutang
        });
        remainingPayment = new Prisma.Decimal(0); // Semua pembayaran sudah habis
      }
    }

    // Hitung ulang total sisa hutang pengguna
    const updatedDebts = await prisma.debt.findMany({
      where: { users_id: debt },
    });
    const totalRemainingDebt = updatedDebts.reduce(
      (total, debt) => total.add(debt.amount),
      new Prisma.Decimal(0),
    );

    // Simpan pembayaran
    await prisma.payment.create({
      data: {
        debt_record_id: allDebts[0].id, // Rekam pembayaran ke salah satu hutang
        amount_paid: paidAmountDecimal.toString(),
        remaining_amount: totalRemainingDebt.toString(), // Total sisa hutang pengguna
        payment_date: new Date(),
      },
    });

    console.log("Updated remaining debt:", totalRemainingDebt.toString());

    // Revalidate path untuk memperbarui UI
    revalidatePath("/dashboard/payment");

    return { message: "Pembayaran berhasil dibuat" };
  } catch (error) {
    console.error("Error membuat pembayaran:", error);
    return { error: { amountPaid: ["Gagal membuat pembayaran"] } };
  }
};
