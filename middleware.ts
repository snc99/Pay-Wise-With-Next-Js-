// middleware.ts
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  // Ambil token dari request
  const token = await getToken({
    req: request, // Gunakan objek request yang benar
    secret: process.env.NEXTAUTH_SECRET,
  });

  // Jika ada token (pengguna sudah login), arahkan ke halaman dashboard
  if (token) {
    // Jika pengguna mencoba mengakses halaman login, arahkan ke dashboard
    if (request.nextUrl.pathname === "/auth/login") {
      const url = new URL("/dashboard", request.url);
      return NextResponse.redirect(url);
    }
    return NextResponse.next(); // Lanjutkan akses halaman lain jika sudah login
  }

  // Jika tidak ada token dan pengguna mencoba mengakses halaman dashboard, arahkan ke login
  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    const url = new URL("/auth/login", request.url);
    return NextResponse.redirect(url);
  }

  // Biarkan pengguna mengakses halaman lain (misalnya login jika tidak ada token)
  return NextResponse.next();
}

// Tentukan rute yang akan diproteksi
export const config = {
  matcher: ["/auth/login", "/dashboard/:path*"], // Proteksi halaman login dan semua rute di /dashboard
};
