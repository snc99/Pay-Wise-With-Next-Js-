import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Hash password untuk keamanan
  const hashedPassword = await bcrypt.hash("admin123", 10);

  // Masukkan data dummy ke dalam tabel Admin
  const dummyAdmins = await prisma.admin.createMany({
    data: [
      {
        name: "Irvan Sandy",
        email: "admin@paywise.com",
        password: hashedPassword,
      },
      {
        name: "Admin 2",
        email: "admin2@paywise.com",
        password: hashedPassword,
      },
      {
        name: "Admin 3",
        email: "admin3@paywise.com",
        password: hashedPassword,
      },
    ],
  });
  console.log("Data dummy Admin berhasil dimasukkan:", dummyAdmins);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
