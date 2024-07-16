import { MdOutlineLogin } from "react-icons/md";

import Image from "next/image";



export default function Home() {
  return (
    <main>
    <header className="fixed inset-0 container flex mx-auto h-[58px] flex items-center justify-between z-1 ">
      <div className="font-semibolt text-xl">
        Pay Wise
      </div>
      <nav>
        <ul className="flex items-center justify-center gap-4">
          <li>Home</li>
          <li>About Us</li>
          <li>Layanan</li>
          <li>Pencatatan</li>
          <li>Kontak</li>
          <button className="flex items-center justify-center gap-2 px-[30px] py-[5px] rounded-xl bg-custom-blue-new text-[18px] text-white font-mulish">Login <MdOutlineLogin size={20}/></button>
        </ul>
      </nav>
    </header>

    <section className="container mx-auto pt-[58px] h-screen flex items-center justify-center flex-col md:flex-row">
      <div className="max-w-lg text-left md:w-1/2">
        <h1 className="text-[40px] font-bold">
          <span className="text-custom-blue-new">Pay Wise </span>- Manajemen Hutang Anda Jadi Mudah!
        </h1>
        <p className="text-custom-gery mt-6">
          Kelola catatan hutang dan piutang dengan praktis dan teratur. Dengan Pay Wise, Anda bisa mencatat transaksi dan memantau status keuangan secara efisien.
        </p>
      </div>
      <div className="w-[900px] h-[600px] md:h-1/2 flex items-center justify-center">
        <img src="/Backgroud/Bg-Header.jpg" alt="bg-header" className="object-cover"/>
      </div>
    </section>
    </main>
  );
}
