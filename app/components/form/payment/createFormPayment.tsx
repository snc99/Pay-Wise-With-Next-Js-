"use client";

import { useEffect, useState } from "react";
import Select from "react-select";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { savePayment } from "@/lib/actionPayment";
import SearchUserDropdownForPayment from "../../search/SearchUserDropdownForPayment";

export interface FormState {
  user: string | null;
  debtId: string | null; // Tambahkan properti debtId
  totalDebt: number | null;
  payment: number | null;
  remainingDebt: number | null;
  amount?: string | null; // Menambahkan field amount untuk tagihan
  error: {
    user: string | null;
    payment?: string | null; // Hanya ada di form pembayaran
    amount?: string | null; // Hanya ada di form tagihan
  };
}

const CreateFormPayment = () => {
  const router = useRouter();
  const [state, setState] = useState<FormState>({
    user: null,
    debtId: null,
    totalDebt: null,
    payment: null,
    remainingDebt: null,
    error: {
      user: null,
      payment: null,
    },
  });
  const [pending, setPending] = useState(false);
  const [userOptions, setUserOptions] = useState<
    { value: string; label: string }[]
  >([]);

  // Ambil data pengguna dari API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/users");
        const users = await response.json();

        // Format data agar sesuai dengan react-select
        const formattedUsers = users.map(
          (user: { id: string; name: string }) => ({
            value: user.id,
            label: user.name,
          }),
        );
        // console.log("Formatted Users:", formattedUsers);
        setUserOptions(formattedUsers); // Menyimpan data pengguna dalam format react-select
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    fetchUsers();
  }, []);

  // Fungsi untuk mengambil total hutang setelah memilih pengguna
  const fetchTotalDebt = async (userId: string) => {
    try {
      const response = await fetch(`/api/debts/${userId}`);
      const data = await response.json();
      setState((prevState) => ({
        ...prevState,
        totalDebt: data.totalDebt, // Mengupdate total debt dari API
        remainingDebt: data.totalDebt, // Mengupdate remaining debt
      }));
    } catch (error) {
      console.error("Error fetching debt:", error);
    }
  };

  const handleUserChange = (
    selectedOption: { value: string; label: string } | null,
  ) => {
    setState((prevState) => ({
      ...prevState,
      user: selectedOption ? selectedOption.value : null,
      debtId: selectedOption ? selectedOption.value : null, // Menyimpan debt ID
    }));

    // Jika pengguna dipilih, ambil data total debt
    if (selectedOption) {
      fetchTotalDebt(selectedOption.value);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setState((prev) => {
      const updatedState = { ...prev, [name]: value };

      if (name === "payment" && prev.totalDebt !== null) {
        updatedState.remainingDebt = Math.max(
          prev.totalDebt - parseFloat(value || "0"),
          0,
        );
      }

      return updatedState;
    });
  };

  const formAction = async (e: React.FormEvent) => {
    e.preventDefault();

    let hasError = false;
    const errorState: FormState["error"] = {
      user: null,
      payment: null,
    };

    // Validasi form
    if (!state.user) {
      errorState.user = "Pilih nama pengguna";
      hasError = true;
    }

    if (!state.payment || isNaN(Number(state.payment))) {
      errorState.payment = "Jumlah bayar harus diisi dan berupa angka";
      hasError = true;
    }

    if (hasError) {
      setState((prevState) => ({ ...prevState, error: errorState }));
      return;
    }

    try {
      setPending(true);

      const result = await savePayment({
        user: state.user,
        debt: state.debtId, // Pastikan state.debtId adalah UUID yang valid
        amountPaid: state.payment, // Gantilah 'amount' dengan 'amountPaid'
      });

      console.log("Save Payment Result:", result);

      // Menangani hasil penyimpanan data
      if (result?.error) {
        setState((prevState) => ({
          ...prevState,
          error: {
            ...prevState.error,
            payment: result.error.amountPaid?.[0] || null, // Tangkap error dari server
          },
        }));
        return;
      }
      if (result?.message) {
        Swal.fire({
          icon: "success",
          title: "Data berhasil disimpan",
        });
        router.push("/dashboard/payment");
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
        <div>
          <SearchUserDropdownForPayment
            setState={setState}
            state={state}
            onChange={handleUserChange}
          />
        </div>
        <div className="mb-3 mt-3">
          <label htmlFor="totalDebt" className="mb-2 block text-gray-900">
            Total Tagihan
          </label>
          <input
            type="number"
            name="totalDebt"
            id="totalDebt"
            value={state.totalDebt || ""}
            disabled
            className="block w-full rounded-lg border border-gray-300 bg-gray-100 p-2.5 text-sm"
          />
        </div>

        <div className="mb-3 mt-3">
          <label htmlFor="payment" className="mb-2 block text-gray-900">
            Bayar
          </label>
          <input
            type="number"
            name="payment"
            id="payment"
            value={state.payment || ""}
            onChange={handleInputChange}
            className="block w-full rounded-lg border border-gray-300 p-2.5 text-sm"
          />
          {state.error.payment && (
            <p className="mt-2 text-sm text-red-600">{state.error.payment}</p>
          )}
        </div>

        <div className="mb-3 mt-3">
          <label htmlFor="remainingDebt" className="mb-2 block text-gray-900">
            Sisa Tagihan
          </label>
          <input
            type="number"
            name="remainingDebt"
            id="remainingDebt"
            value={state.remainingDebt || ""}
            disabled
            className="block w-full rounded-lg border border-gray-300 bg-gray-100 p-2.5 text-sm"
          />
        </div>

        <div className="flex gap-x-4 text-sm">
          <button type="submit" disabled={pending} className="btn">
            {pending ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateFormPayment;
