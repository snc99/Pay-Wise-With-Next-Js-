"use client";

import { updateUser } from "@/lib/actions";
import { useFormState } from "react-dom";
import { SubmitButton } from "../button/button";
import type { Users } from "@prisma/client";

const UpdateFormUser = ({ user }: { user: Users }) => {
  const updateUserWhithId = updateUser.bind(null, user.id);
  const [state, formAction] = useFormState(updateUserWhithId, null);

  return (
    <div>
      <form action={formAction}>
        <div className="mb-5">
          <label htmlFor="Name" className="mb-2 block text-gray-900">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-new focus:ring-blue"
            placeholder="John Doe"
            defaultValue={user.name}
          />
          <div id="name-error " arial-live="polite" aria-atomic="true">
            <p className="mt-2 text-sm text-red">{state?.error?.name}</p>
          </div>
        </div>
        <div className="mb-5">
          <label htmlFor="phone" className="mb-2 block text-gray-900">
            Your Phone
          </label>
          <input
            type="text"
            name="phone"
            id="phone"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-new focus:ring-blue"
            placeholder="Phone Number"
            defaultValue={user.phone}
          />
          <div id="phone-error " arial-live="polite" aria-atomic="true">
            <p className="mt-2 text-sm text-red">{state?.error?.phone}</p>
          </div>
          <div id="message-error " arial-live="polite" aria-atomic="true">
            <p className="mt-2 text-sm text-red">{state?.message}</p>
          </div>
          <SubmitButton label="update" />
        </div>
      </form>
    </div>
  );
};

export default UpdateFormUser;
