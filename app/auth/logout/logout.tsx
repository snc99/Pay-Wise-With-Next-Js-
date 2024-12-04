import { signOut } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";

const Logout = () => {
  const router = useRouter();

  useEffect(() => {
    const handleLogout = async () => {
      await signOut({ redirect: false }); // Menghapus sesi tanpa redirect otomatis
      router.push("/auth/login"); // Arahkan ke halaman login setelah logout
    };

    handleLogout();
  }, [router]);

  return <div>Logging out...</div>; // Tampilkan pesan sementara
};

export default Logout;
