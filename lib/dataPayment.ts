import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

const ITEMS_PER_PAGE = 5;

export const getPayment = async (
  query: string,
  currentPage: number,
  itemsPerPage = ITEMS_PER_PAGE,
) => {
  const offset = (currentPage - 1) * itemsPerPage;

  try {
    console.log("Query pembayaran:", query);
    console.log("Halaman saat ini:", currentPage);

    // Ambil data pembayaran pada halaman ini
    const payments = await prisma.payment.findMany({
      skip: offset,
      take: itemsPerPage,
      where: {
        debt: {
          user: {
            name: {
              contains: query,
              mode: "insensitive",
            },
          },
        },
      },
      include: {
        debt: {
          select: {
            totalDebt: true,
            amount: true,
            user: {
              select: {
                name: true,
                phone: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // Hitung total hutang (dari semua catatan hutang pengguna)
    const allDebts = await prisma.debt.findMany({
      where: {
        user: {
          name: {
            contains: query,
            mode: "insensitive",
          },
        },
      },
    });

    const totalDebt = allDebts.reduce(
      (sum, debt) => sum + parseFloat(debt.totalDebt.toString()),
      0,
    );

    // Hitung total pembayaran (dari semua pembayaran pengguna)
    const allPayments = await prisma.payment.findMany({
      where: {
        debt: {
          user: {
            name: {
              contains: query,
              mode: "insensitive",
            },
          },
        },
      },
    });

    const totalPayments = allPayments.reduce(
      (sum, payment) => sum + parseFloat(payment.amount_paid.toString()),
      0,
    );

    // Hitung sisa hutang
    const remainingDebt = totalDebt - totalPayments;

    console.log("Total Hutang:", totalDebt);
    console.log("Total Pembayaran:", totalPayments);
    console.log("Sisa Hutang:", remainingDebt);

    return {
      payments,
      totalDebt,
      totalPayments,
      remainingDebt,
    };
  } catch (error) {
    console.error("Error mengambil data pembayaran:", error);
    throw new Error("Gagal mengambil data pembayaran");
  }
};

export const getUserDebtSummary = async (userId: string) => {
  try {
    const allDebts = await prisma.debt.findMany({
      where: { users_id: userId },
    });

    const totalDebt = allDebts.reduce(
      (total, debt) => total.add(debt.totalDebt),
      new Prisma.Decimal(0),
    );
    const totalRemaining = allDebts.reduce(
      (total, debt) => total.add(debt.amount),
      new Prisma.Decimal(0),
    );

    return {
      totalDebt: totalDebt.toNumber(),
      totalRemaining: totalRemaining.toNumber(),
    };
  } catch (error) {
    console.error("Error fetching user debt summary:", error);
    throw new Error("Gagal mengambil data ringkasan hutang pengguna");
  }
};

// export const getPayment = async (
//   query: string,
//   currentPage: number,
//   itemsPerPage = 5,
// ) => {
//   const offset = (currentPage - 1) * itemsPerPage;

//   try {
//     console.log("Query pembayaran:", query); // Debug query dari input
//     console.log("Halaman saat ini:", currentPage);

//     // Ambil semua pembayaran dengan pengguna dan hutang terkait
//     const payments = await prisma.payment.findMany({
//       skip: offset,
//       take: itemsPerPage,
//       where: {
//         debt: {
//           user: {
//             name: {
//               contains: query,
//               mode: "insensitive", // Query tidak case-sensitive
//             },
//           },
//         },
//       },
//       include: {
//         debt: {
//           select: {
//             totalDebt: true, // Total hutang tetap
//             amount: true, // Sisa hutang
//             user: {
//               select: {
//                 name: true, // Nama pengguna
//                 phone: true, // Nomor telepon (opsional)
//               },
//             },
//           },
//         },
//       },
//       orderBy: {
//         createdAt: "desc", // Urutkan berdasarkan waktu pembayaran terbaru
//       },
//     });

//     console.log("Pembayaran yang ditemukan:", payments); // Debug hasil pembayaran

//     return payments;
//   } catch (error) {
//     console.error("Error mengambil data pembayaran:", error);
//     throw new Error("Gagal mengambil data pembayaran");
//   }
// };
