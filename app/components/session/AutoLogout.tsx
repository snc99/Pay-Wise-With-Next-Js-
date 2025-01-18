"use client";

import { signOut } from "next-auth/react";
import { useEffect } from "react";
import Swal from "sweetalert2";

export default function AutoLogout() {
  const SESSION_TIMEOUT = 30 * 60 * 1000;

  useEffect(() => {
    let timer: NodeJS.Timeout;

    const resetTimer = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "error",
          title: "Sesi Anda telah berakhir",
          showConfirmButton: false,
          timer: 5000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });

        setTimeout(() => {
          signOut();
        }, 5000);
      }, SESSION_TIMEOUT);
    };

    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keypress", resetTimer);

    resetTimer();

    return () => {
      clearTimeout(timer);
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keypress", resetTimer);
    };
  }, []);

  return null;
}
