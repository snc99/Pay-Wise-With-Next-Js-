import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { JWT } from "next-auth/jwt";
import { Session } from "next-auth";

const prisma = new PrismaClient();

const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        // Cari admin berdasarkan email
        const admin = await prisma.admin.findUnique({
          where: { email: credentials.email },
        });

        if (!admin) {
          throw new Error("No user found with the email");
        }

        // Validasi password
        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          admin.password,
        );

        if (!isPasswordValid) {
          throw new Error("Invalid password");
        }

        // Kembalikan data pengguna yang valid
        return { id: admin.id, name: admin.name, email: admin.email };
      },
    }),
  ],
  session: {
    strategy: "jwt", // Gunakan strategi JWT
  },
  callbacks: {
    async jwt({
      token,
      user,
    }: {
      token: JWT;
      user?: { id: string; name?: string | null; email: string };
    }) {
      if (user) {
        token.id = user.id; // Tambahkan id ke dalam token
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (token) {
        session.user.id = token.id as string; // Pastikan `id` di-cast ke tipe string
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
