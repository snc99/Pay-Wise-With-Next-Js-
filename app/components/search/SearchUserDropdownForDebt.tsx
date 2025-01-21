import { Dispatch, SetStateAction } from "react";
import Select from "react-select";
import axios from "axios";
import { FormState } from "@/app/components/form/debt/createFormDebt";
import { useState, useEffect } from "react";

// Tipe props untuk SearchUserDropdown
interface SearchUserDropdownProps {
  setState: Dispatch<SetStateAction<FormState>>;
  state: FormState;
}

// Tipe untuk opsi yang diterima oleh Select
interface OptionType {
  value: string;
  label: string;
}

export default function SearchUserDropdown({
  setState,
  state,
}: SearchUserDropdownProps) {
  const [options, setOptions] = useState<OptionType[]>([]); // Menentukan tipe untuk options
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1); // Track page untuk pagination

  // Menambahkan state untuk mengecek apakah form sudah disubmit
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  // Fungsi untuk mengambil data dari API
  const fetchData = async (searchQuery: string, page: number) => {
    setLoading(true);
    try {
      const response = await axios.get("/api/users", {
        params: { query: searchQuery, page }, // Kirimkan query pencarian dan halaman
      });
      const userOptions = response.data.map(
        (user: { id: string; name: string }) => ({
          value: user.id,
          label: user.name,
        }),
      );
      setOptions(userOptions);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fungsi untuk menangani perubahan input pencarian
  const handleSearchChange = (inputValue: string) => {
    setSearchTerm(inputValue);
    setPage(1); // Reset ke halaman pertama ketika query berubah
    fetchData(inputValue, 1);
  };

  // Update state error jika pengguna belum dipilih hanya setelah form disubmit
  useEffect(() => {
    if (isFormSubmitted && !state.user) {
      setState((prevState: FormState) => ({
        ...prevState,
        error: { ...prevState.error, user: "Pilih pengguna yang valid" },
      }));
    }
  }, [state.user, isFormSubmitted, setState]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsFormSubmitted(true); // Set formSubmitted menjadi true ketika tombol simpan diklik
    // Lakukan validasi form di sini (misalnya validasi untuk "user" dan field lainnya)
  };

  return (
    <div className="mb-3 mt-3">
      <label id="user" htmlFor="user" className="mb-2 block text-gray-900">
        Nama
      </label>
      <Select
        name="user"
        options={options}
        onInputChange={handleSearchChange}
        isLoading={loading}
        placeholder="Pilih Nama"
        isSearchable
        className="text-sm"
        onChange={(selectedOption: OptionType | null) => {
          // Memastikan selectedOption ada dan tipe-nya sudah benar
          if (selectedOption) {
            setState((prevState: FormState) => ({
              ...prevState,
              user: selectedOption.value, // Menyimpan ID pengguna yang dipilih
              error: { ...prevState.error, user: null }, // Menghapus error setelah valid
            }));
          }
        }}
      />
      {/* Menampilkan pesan error jika ada dan form sudah disubmit */}
      {state.error.user && (
        <p className="m-2 text-sm text-red-600">{state.error.user}</p>
      )}
    </div>
  );
}
