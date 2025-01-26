"use server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";

// Skema validasi untuk amount dan user
const DebtSchema = z.object({
  user: z.string().min(4),
  amount: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0),
});

// actionDebt.ts
export const saveAmount = async (prevState: any) => {
  console.log("Memulai proses pencatatan hutang...");

  // Validasi input
  const validateField = DebtSchema.safeParse(prevState);
  console.log("Validasi input:", validateField);

  if (!validateField.success) {
    console.error("Validasi gagal:", validateField.error);
    return { error: "Data tidak valid" };
  }

  try {
    const { user, amount } = validateField.data;
    const debtAmount = new Prisma.Decimal(amount.replace(/[^0-9.-]+/g, ""));
    console.log(
      "Jumlah hutang (dikonversi ke Decimal):",
      debtAmount.toString(),
    );

    // Cari data hutang yang sudah ada untuk user ini
    console.log("Mencari data hutang untuk user:", user);
    const existingDebt = await prisma.debt.findFirst({
      where: { users_id: user },
    });

    if (existingDebt) {
      console.log("Data hutang ditemukan:", existingDebt);

      // Hitung totalDebt baru
      const newTotalDebt = existingDebt.totalDebt.add(debtAmount);
      console.log("TotalDebt baru:", newTotalDebt.toString());

      // Update totalDebt di entri yang sudah ada
      await prisma.debt.update({
        where: { id: existingDebt.id },
        data: { totalDebt: newTotalDebt },
      });
      console.log("TotalDebt berhasil diupdate.");
    } else {
      console.log("Data hutang tidak ditemukan. Membuat entri baru...");

      // Buat entri baru jika tidak ada data hutang
      await prisma.debt.create({
        data: {
          users_id: user,
          amount: debtAmount,
          totalDebt: debtAmount, // TotalDebt awal sama dengan amount
        },
      });
      console.log("Entri hutang baru berhasil dibuat.");
    }

    // Revalidate path untuk memperbarui UI
    console.log("Memperbarui UI dengan revalidatePath...");
    revalidatePath("/dashboard/debt");

    console.log("Proses pencatatan hutang selesai.");
    return { message: "Hutang berhasil dicatat" };
  } catch (error) {
    console.error("Terjadi kesalahan saat mencatat hutang:", error);
    return { error: "Gagal mencatat hutang" };
  }
};
// export const saveAmount = async (prevState: any) => {
//   // Validasi input
//   const validateField = DebtSchema.safeParse(prevState);

//   // Jika validasi gagal, kirimkan error
//   if (!validateField.success) {
//     return {
//       error: {
//         amount: validateField.error.errors
//           .filter((e) => e.path[0] === "amount")
//           .map((e) => e.message),
//         user: validateField.error.errors
//           .filter((e) => e.path[0] === "user")
//           .map((e) => e.message),
//       },
//     };
//   }

//   try {
//     // Mengonversi amount dan totalDebt menjadi decimal
//     const amount = new Prisma.Decimal(
//       validateField.data.amount.replace(/[^0-9.-]+/g, ""),
//     );

//     // Menyimpan data ke database dengan totalDebt
//     await prisma.debt.create({
//       data: {
//         users_id: validateField.data.user, // ID user yang terhubung dengan debt
//         amount: amount, // Jumlah hutang yang perlu dibayar
//         totalDebt: amount, // Total tagihan awal
//       },
//     });

//     // Revalidate halaman untuk memuat ulang data
//     revalidatePath("/dashboard/debt");

//     // Mengembalikan pesan sukses
//     return { message: "Debt created successfully" };
//   } catch (error) {
//     // Menangani error dan mencetak pesan error
//     console.error("Error creating debt:", error);
//     return { error: { amount: ["Failed to create debt"] } };
//   }
// };
