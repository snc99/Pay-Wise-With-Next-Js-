import React from "react";
import CreateFormDebt from "@/app/components/form/debt/create-form-debt";

const CreateDebtPage = () => {
  return (
    <div className="mx-auto mt-5 max-w-full rounded-md rounded-s-sm bg-base-200 p-6 shadow-md">
      <h1 className="mb-5 text-center text-2xl font-bold">
        Tambah Pencatatan Hutang
      </h1>
      <CreateFormDebt />
    </div>
  );
};

export default CreateDebtPage;
