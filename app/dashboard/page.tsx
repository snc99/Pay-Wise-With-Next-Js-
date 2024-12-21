"use client";

import { useEffect, useState } from "react";
import Toast from "@/app/components/sweetalert/Toast"; // Pastikan path sesuai
import Card from "../components/dashboard/Card";

export default function Dashboard() {
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    // Menampilkan toast setelah login berhasil
    setShowToast(true);
  }, []);

  return (
    <div>
      {showToast && <Toast icon="success" title="Successfully Logged In" />}
      <Card />
    </div>
  );
}
