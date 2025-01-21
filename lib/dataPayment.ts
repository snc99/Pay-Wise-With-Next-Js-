// Query data payment

import { prisma } from "@/lib/prisma";

const ITEMS_PER_PAGE = 5; // Ubah sesuai kebutuhan

export const getPayment = async (query: string, currentPage: number) => {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    // Fetch data pembayaran dengan filtering berdasarkan `query`
    const payments = await prisma.payment.findMany({
      where: {
        OR: [
          {
            debt: {
              user: {
                name: {
                  contains: query, // Filter berdasarkan nama user
                  mode: "insensitive",
                },
              },
            },
          },
          {
            debt: {
              id: {
                contains: query, // Filter berdasarkan debtId
                mode: "insensitive",
              },
            },
          },
        ],
      },
      include: {
        debt: {
          include: {
            user: true,
          },
        },
      },
      skip: offset,
      take: ITEMS_PER_PAGE,
      orderBy: {
        payment_date: "desc", // Gunakan nama field yang benar sesuai dengan Prisma schema
      },
    });

    // Hitung total pembayaran untuk keperluan pagination
    const totalPayments = await prisma.payment.count({
      where: {
        OR: [
          {
            debt: {
              user: {
                name: {
                  contains: query,
                  mode: "insensitive",
                },
              },
            },
          },
          {
            debt: {
              id: {
                contains: query,
                mode: "insensitive",
              },
            },
          },
        ],
      },
    });

    return {
      payments,
      totalPages: Math.ceil(totalPayments / ITEMS_PER_PAGE),
      currentPage,
    };
  } catch (error) {
    console.error("Error fetching payments:", error);
    throw new Error("Failed to fetch payments. Please try again later.");
  }
};
