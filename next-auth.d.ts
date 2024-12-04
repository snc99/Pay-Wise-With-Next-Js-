import "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    email: string;
    name?: string | null;
  }

  interface Session {
    user: User & {
      id: string; // Tambahkan id ke Session.user
    };
  }
}
