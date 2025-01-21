import Link from "next/link";
import { AiOutlineUsergroupAdd } from "react-icons/ai";

export const CreatePayment = () => {
  return (
    <Link
      href="/dashboard/payment/create"
      className="inline-flex items-center space-x-2 rounded-lg bg-blue-400 px-5 py-2 text-sm font-medium text-black transition duration-200 hover:bg-blue-300 hover:text-gray-700 hover:shadow-md"
    >
      <AiOutlineUsergroupAdd size={20} className="text-black" />
      <span>Tambah Pembayaran</span>
    </Link>
  );
};
