import React from "react";
import CreateFormUser from "@/app/components/form/user/create-form-user";

const CreateUserPage = () => {
  return (
    <div className="mx-auto mt-5 max-w-full rounded-s-sm bg-base-200 p-6 shadow-md">
      <h1 className="mb-5 text-center text-2xl font-bold">Tambah Pengguna</h1>
      <CreateFormUser />
    </div>
  );
};

export default CreateUserPage;
