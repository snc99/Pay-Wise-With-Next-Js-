"use client";

import Swal from "sweetalert2";

interface AlertProps {
  title: string;
  text: string;
  icon: "success" | "error" | "warning" | "info" | "question";
  confirmButtonText?: string;
  onClose?: () => void; // Callback untuk dijalankan setelah alert ditutup
  trigger: boolean; // Menambahkan properti trigger untuk menampilkan alert
}

export default function Alert({
  title,
  text,
  icon,
  confirmButtonText = "OK",
  onClose,
  trigger,
}: AlertProps) {
  // Menampilkan alert hanya jika trigger bernilai true
  if (trigger) {
    Swal.fire({
      title,
      text,
      icon,
      confirmButtonText,
    }).then(() => {
      if (onClose) onClose(); // Panggil callback setelah alert ditutup
    });
  }

  return null; // Tidak ada UI lain yang perlu ditampilkan
}
