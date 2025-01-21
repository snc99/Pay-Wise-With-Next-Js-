import React from "react";
import { NumericFormat } from "react-number-format";
import { FormState } from "@/app/components/form/debt/createFormDebt";

// Menambahkan tipe props untuk AmountInput
interface AmountInputProps {
  setState: React.Dispatch<React.SetStateAction<FormState>>;
  state: FormState;
}

export default function AmountInput({ setState, state }: AmountInputProps) {
  const handleAmountChange = (values: any) => {
    const { value } = values;

    const cleanAmount = value.replace(/[^0-9]/g, "");

    if (isNaN(Number(cleanAmount)) || cleanAmount === "") {
      setState((prevState: FormState) => ({
        ...prevState,
        error: {
          ...prevState.error,
          amount: "Jumlah yang dimasukkan tidak valid.",
        },
      }));
    } else {
      setState((prevState: FormState) => ({
        ...prevState,
        amount: cleanAmount,
        error: { ...prevState.error, amount: null },
      }));
    }
  };

  return (
    <div className="mb-3 mt-3">
      <label id="amount" htmlFor="amount" className="mb-2 block text-gray-900">
        Jumlah
      </label>
      <NumericFormat
        name="amount"
        value={state.amount || ""}
        onValueChange={handleAmountChange}
        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-400"
        placeholder="Jumlah hutang"
        thousandSeparator={true}
        prefix="Rp "
        allowNegative={false}
        decimalScale={0}
      />
      {state.error.amount && (
        <div id="amount-error" aria-live="polite" aria-atomic="true">
          <p className="mt-2 text-sm text-red-500">{state.error.amount}</p>
        </div>
      )}
    </div>
  );
}
