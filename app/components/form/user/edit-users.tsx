"use client";

import { updateUser } from "@/lib/actionsUser";
import { useFormState } from "react-dom";
import { SubmitButton } from "../../button/buttonUser";
import type { Users } from "@prisma/client";
import { BackButton } from "../../button/buttonBack";

const UpdateFormUser = ({ user }: { user: Users }) => {
  const updateUserWhithId = updateUser.bind(null, user.id);
  const [state, formAction] = useFormState(updateUserWhithId, null);

  return (
    <div>
      <form action={formAction}>
        <div className="mb-5">
          <label htmlFor="Name" className="mb-2 block text-gray-900">
            Nama
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
            placeholder="John Doe"
            defaultValue={user.name}
          />
          <div id="name-error " arial-live="polite" aria-atomic="true">
            <p className="text-red mt-2 text-sm">{state?.error?.name}</p>
          </div>
        </div>
        <div className="mb-5">
          <label htmlFor="phone" className="mb-2 block text-gray-900">
            Nomor Telepon
          </label>
          <input
            type="text"
            name="phone"
            id="phone"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
            placeholder="Phone Number"
            defaultValue={user.phone}
          />
          <div id="phone-error " arial-live="polite" aria-atomic="true">
            <p className="text-red mt-2 text-sm">{state?.error?.phone}</p>
          </div>
          <div id="message-error " arial-live="polite" aria-atomic="true">
            <p className="text-red mt-2 text-sm">{state?.message}</p>
          </div>
          <div className="flex gap-x-4">
            <SubmitButton label="update" />
            <BackButton />
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateFormUser;
