import { prisma } from "@/lib/prisma";

const ITEMS_PER_PAGE = 5;

export const getUsers = async (query: string, currentPage: number) => {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  try {
    const users = await prisma.users.findMany({
      skip: offset,
      take: ITEMS_PER_PAGE,
      where: {
        OR: [
          {
            name: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            phone: {
              contains: query,
              mode: "insensitive",
            },
          },
        ],
      },
    });
    return users;
  } catch (error) {
    throw new Error("Failed to fetch users data");
  }
};

export const getUsersById = async (id: string) => {
  try {
    const user = await prisma.users.findUnique({ where: { id } });
    return user;
  } catch (error) {
    throw new Error("Failed to fetch users data");
  }
};

export const getUsersPages = async (query: string) => {
  try {
    const users = await prisma.users.count({
      where: {
        OR: [
          {
            name: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            phone: {
              contains: query,
              mode: "insensitive",
            },
          },
        ],
      },
    });
    const totalPages = Math.ceil(Number(users) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    throw new Error("Failed to fetch users data");
  }
};
