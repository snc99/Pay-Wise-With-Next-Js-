"use client";

import { useState } from "react";
import { saveUser } from "@/lib/actionsUser";
import { useFormState } from "react-dom";
import { SubmitButton } from "../../button/buttonUser";
import { BackButton } from "../../button/buttonBack";

const CreateFormUser = () => {
  const [state, formAction] = useFormState(saveUser, null);

  const [pending, setPending] = useState(false);

  return (
    <div>
      <form action={formAction}>
        <div className="mb-3 mt-3">
          <label htmlFor="Name" className="mb-2 block text-gray-900">
            Nama Lengkap
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-400"
            placeholder="John Doe"
          />
          <div id="name-error" arial-live="polite" aria-atomic="true">
            <p className="mt-2 text-sm text-red-600">{state?.error?.name}</p>
          </div>
        </div>
        <div className="mb-3 mt-3">
          <label htmlFor="phone" className="mb-2 block text-gray-900">
            Nomor Telepon
          </label>
          <input
            type="text"
            name="phone"
            id="phone"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-400"
            placeholder="Phone Number"
          />
          <div id="phone-error" arial-live="polite" aria-atomic="true">
            <p className="mt-2 text-sm text-red-500">{state?.error?.phone}</p>
          </div>
          <div id="message-error" arial-live="polite" aria-atomic="true">
            <p className="mt-2 text-sm text-red-500">{state?.message}</p>
          </div>
        </div>
        <div className="flex gap-x-4">
          <SubmitButton label="save" />
          <BackButton />
        </div>
      </form>
    </div>
  );
};

export default CreateFormUser;
