"use client";

import Swal from "sweetalert2";
import { useEffect } from "react";

interface ToastProps {
  icon: "success" | "error" | "warning" | "info" | "question";
  title: string;
}

export default function Toast({ icon, title }: ToastProps) {
  useEffect(() => {
    Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    }).fire({
      icon,
      title,
    });
  }, [icon, title]);

  return null; // Komponen ini hanya digunakan untuk menampilkan toast, tidak ada elemen UI yang ditampilkan
}
