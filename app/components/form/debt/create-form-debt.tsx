"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { saveAmount } from "@/lib/actionsDebt";
import { SubmitButtonAmount } from "@/app/components/button/buttonDebt";
import SearchUserDropdown from "@/app/components/search/SearchUserDropdown";
import AmountInput from "@/app/components/amountInput/amountInput";
import { BackButton } from "../../button/buttonBack";

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

  const [state, setState] = useState<FormState>({
    amount: null,
    user: null,
    error: { amount: null, user: null },
  });

  const [pending, setPending] = useState(false);

  const formAction = async (e: React.FormEvent) => {
    e.preventDefault();

    // console.log("State saat ini:", state);

    let hasError = false;
    const errorState: FormState["error"] = {
      amount: null,
      user: null,
    };

    if (!state.amount || isNaN(Number(state.amount))) {
      errorState.amount = "Jumlah harus di isi";
      hasError = true;
    }

    if (!state.user) {
      errorState.user = "Pilih nama pengguna";
      hasError = true;
    }

    if (hasError) {
      setState((prevState) => ({
        ...prevState,
        error: errorState,
      }));
      return;
    }

    const cleanedAmount =
      typeof state.amount === "string"
        ? state.amount.replace(/[^0-9]/g, "")
        : "";

    try {
      // console.log("Mengirim data ke saveAmount...");

      setPending(true);

      const result: SaveAmountResult = await saveAmount({
        ...state,
        amount: cleanedAmount,
      });

      // console.log("Hasil dari saveAmount:", result);

      if ("error" in result) {
        console.error("Gagal menyimpan data:", result.error);
        setState((prevState) => ({
          ...prevState,
          error: {
            ...prevState.error,
            amount: result.error.amount ? result.error.amount[0] : null,
            user: result.error.user ? result.error.user[0] : null,
          },
        }));
      } else if ("message" in result) {
        // console.log("Pesan sukses:", result.message);
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
