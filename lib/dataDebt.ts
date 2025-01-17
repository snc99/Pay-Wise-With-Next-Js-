// Query data debt

import { prisma } from "@/lib/prisma";

const ITEMS_PER_PAGE = 5;

export const getDebt = async (query: string, currentPage: number) => {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  try {
    const debt = await prisma.debt.findMany({
      skip: offset,
      take: ITEMS_PER_PAGE,
      where: {
        user: {
          name: {
            contains: query,
            mode: "insensitive",
          },
        },
      },
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return debt;
  } catch (error) {
    console.error("Error fetching debt data:", error);
    throw new Error("gagal Mengambil data");
  }
};
