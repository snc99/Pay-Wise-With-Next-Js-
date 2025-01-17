import { useRouter } from "next/navigation";

export const BackButton = () => {
  const router = useRouter();

  const handleBack = () => {
    router.back(); // Mengarahkankan ke halaman sebelumnya
  };

  return (
    <button
      type="button"
      onClick={handleBack}
      className="border-blue-600 text-blue-600 hover:bg-blue-100 flex items-center rounded-md border bg-white px-4 py-1 text-sm font-bold shadow-md transition duration-300"
    >
      <svg
        className="mr-2 h-4 w-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M15 19l-7-7 7-7"
        />
      </svg>
      Kembali
    </button>
  );
};
