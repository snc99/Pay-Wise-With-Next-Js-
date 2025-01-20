"use client";

import { useEffect, useState } from "react";
import Toast, { useToast } from "@/app/components/sweetalert/Toast"; // Pastikan path sesuai
import Card from "../components/dashboard/Card";

export default function Dashboard() {
  // const { showToast, setToastShown } = useToast();

  // useEffect(() => {
  //   if (showToast) {
  //     setToastShown(); // Matikan toast setelah pertama kali ditampilkan
  //   }
  // }, [showToast, setToastShown]);

  return (
    <div>
      {/* {showToast && <Toast icon="success" title="Successfully Logged In" />} */}
      <Card />
    </div>
  );
}
