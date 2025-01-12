"use client";

import Swal from "sweetalert2";
import { useEffect } from "react";

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
  useEffect(() => {
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
  }, [trigger, title, text, icon, confirmButtonText, onClose]); // Trigger alert hanya saat salah satu nilai berubah

  return null;
}
