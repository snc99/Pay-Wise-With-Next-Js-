"use client";

import { signOut } from "next-auth/react";
import { useEffect } from "react";
import Swal from "sweetalert2";

export default function AutoLogout() {
  const SESSION_TIMEOUT = 30 * 1000; // 30 detik

  useEffect(() => {
    let timer: NodeJS.Timeout;

    const resetTimer = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        // Tampilkan pesan SweetAlert dengan tombol OK
        Swal.fire({
          title: "Sesi Berakhir",
          text: "Sesi Anda telah berakhir karena tidak ada aktivitas. Anda akan logout.",
          icon: "warning",
          confirmButtonText: "OK",
        }).then(() => {
          // Logout setelah pengguna menekan tombol OK
          signOut();
        });
      }, SESSION_TIMEOUT);
    };

    // Deteksi aktivitas pengguna (klik, gerakan mouse, atau keyboard)
    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keypress", resetTimer);

    // Atur timer pertama kali
    resetTimer();

    return () => {
      // Bersihkan event listener dan timer saat komponen dilepas
      clearTimeout(timer);
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keypress", resetTimer);
    };
  }, []);

  return null; // Komponen ini hanya berfungsi sebagai listener
}
