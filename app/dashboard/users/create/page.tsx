import React from "react";
import CreateFormUser from "@/app/components/form/create-form-user";

const CreateUserPage = () => {
  return (
    <div className="mx-auto mt-5 max-w-md">
      <h1 className="text-2xl font-bold">Create User</h1>
      <CreateFormUser />
    </div>
  );
};

export default CreateUserPage;
