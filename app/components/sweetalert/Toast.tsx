"use client";

import Swal from "sweetalert2";
import { useEffect } from "react";
import { createContext, useContext, useState, ReactNode } from "react";


interface ToastContextProps {
  showToast: boolean;
  setToastShown: () => void;
}

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


// ToastContext.tsx



const ToastContext = createContext<ToastContextProps | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [showToast, setShowToast] = useState(true); // Default: true setelah login

  const setToastShown = () => setShowToast(false);

  return (
    <ToastContext.Provider value={{ showToast, setToastShown }}>
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
