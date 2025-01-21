import React from "react";
import CreateFormPayment from "@/app/components/form/payment/createFormPayment";

const CreatePaymentPage = () => {
  return (
    <div className="mx-auto mt-5 max-w-full rounded-s-sm bg-base-200 p-6 shadow-md">
      <h1 className="mb-5 text-center text-2xl font-bold">Tambah Pembayaran</h1>
      <CreateFormPayment />
    </div>
  );
};

export default CreatePaymentPage;
