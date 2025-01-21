"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { saveAmount } from "@/lib/actionsDebt";
import { SubmitButtonAmount } from "@/app/components/button/buttonDebt";
import SearchUserDropdown from "@/app/components/search/SearchUserDropdownForDebt";
import AmountInput from "@/app/components/amountInput/amountInput";
import { BackButton } from "../../button/buttonBack";
import Swal from "sweetalert2";

type SaveAmountResult =
  | { error: { amount?: string[]; user?: string[] } }
  | { message: string };

export interface FormState {
  amount: string | null;
  user: string | null;
  error: {
    amount: string | null;
    user: string | null;
  };
}

const CreateFormDebt = () => {
  const router = useRouter();

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });

  const [state, setState] = useState<FormState>({
    amount: null,
    user: null,
    error: { amount: null, user: null },
  });

  const [pending, setPending] = useState(false);

  const formAction = async (e: React.FormEvent) => {
    e.preventDefault();

    let hasError = false;
    const errorState: FormState["error"] = {
      amount: null,
      user: null,
    };

    // Validasi input form
    if (!state.amount || isNaN(Number(state.amount))) {
      errorState.amount = "Jumlah harus di isi dan berupa angka";
      hasError = true;
    }

    if (!state.user) {
      errorState.user = "Pilih nama pengguna";
      hasError = true;
    }

    if (hasError) {
      // Set error state jika ada error
      setState((prevState) => ({
        ...prevState,
        error: errorState,
      }));

      // Tampilkan Toast error
      // Toast.fire({
      //   icon: "error",
      //   title: "Terdapat kesalahan pada form",
      // });

      return;
    }

    const cleanedAmount =
      typeof state.amount === "string"
        ? state.amount.replace(/[^0-9]/g, "")
        : "";

    try {
      setPending(true);

      const result: SaveAmountResult = await saveAmount({
        ...state,
        amount: cleanedAmount,
      });

      if ("error" in result) {
        // Set error state jika ada error dari server
        setState((prevState) => ({
          ...prevState,
          error: {
            ...prevState.error,
            amount: result.error.amount ? result.error.amount[0] : null,
            user: result.error.user ? result.error.user[0] : null,
          },
        }));

        // Tampilkan Toast error dari server
        // Toast.fire({
        //   icon: "error",
        //   title: "Gagal menyimpan data",
        // });
      } else if ("message" in result) {
        // Tampilkan Toast sukses
        Toast.fire({
          icon: "success",
          title: "Data berhasil disimpan",
        });

        // Redirect ke halaman debt setelah sukses
        router.push("/dashboard/debt");
      }
    } catch (error) {
      console.error("Terjadi kesalahan saat menyimpan data", error);
    } finally {
      setPending(false);
    }
  };

  return (
    <div>
      <form onSubmit={formAction}>
        <SearchUserDropdown setState={setState} state={state} />
        <AmountInput setState={setState} state={state} />
        <div className="flex gap-x-4 text-sm">
          <SubmitButtonAmount label="save" pending={pending} />
          <BackButton />
        </div>
      </form>
    </div>
  );
};

export default CreateFormDebt;
