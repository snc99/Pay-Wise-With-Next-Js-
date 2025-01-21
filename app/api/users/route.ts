import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // Pastikan prisma diimpor dengan benar

export async function GET(request: Request) {
  const url = new URL(request.url);
  const query = url.searchParams.get("query") || "";
  const page = parseInt(url.searchParams.get("page") || "1", 10);
  const limit = 5;
  const offset = (page - 1) * limit;
  const type = url.searchParams.get("type"); // Parameter 'type' untuk menentukan data tambahan

  try {
    // Ambil pengguna sesuai query
    const users = await prisma.users.findMany({
      skip: offset,
      take: limit,
      where: {
        name: {
          contains: query,
          mode: "insensitive",
        },
      },
    });

    // Jika `type` adalah 'payment', tambahkan data `totalDebt`
    if (type === "payment") {
      const userIds = users.map((user) => user.id); // Ambil semua ID pengguna yang ditemukan

      // Ambil total tagihan untuk semua pengguna dalam satu query
      const debts = await prisma.debt.groupBy({
        by: ["users_id"],
        _sum: { amount: true },
        where: { users_id: { in: userIds } },
      });

      // Gabungkan data pengguna dengan total tagihan
      const usersWithDebt = users
        .map((user) => {
          const userDebt = debts.find((debt) => debt.users_id === user.id);
          let totalDebt = userDebt?._sum.amount || 0;

          // Jika totalDebt adalah Decimal, konversi ke number
          if (
            totalDebt &&
            typeof totalDebt === "object" &&
            "toNumber" in totalDebt
          ) {
            totalDebt = totalDebt.toNumber(); // Konversi ke number
          }

          return {
            ...user,
            totalDebt,
          };
        })
        .filter((user) => user.totalDebt > 0); // Filter pengguna dengan totalDebt > 0

      return NextResponse.json(usersWithDebt);
    }

    // Respons default jika `type` bukan 'payment'
    return NextResponse.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 },
    );
  }
}
