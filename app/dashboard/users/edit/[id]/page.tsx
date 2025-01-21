import UpdateFormUser from "@/app/components/form/user/editUsers";
import { getUsersById } from "@/lib/dataUser";
import { notFound } from "next/navigation";

const UpdateUserPage = async ({ params }: { params: { id: string } }) => {
  const id = params.id;
  const user = await getUsersById(id);

  if (!user) {
    notFound();
  }
  return (
    <div className="card mx-auto my-5 max-w-full rounded-lg bg-base-200 p-6 shadow-lg">
      <h1 className="mb-4 text-center text-2xl font-bold">Edit Pengguna</h1>
      <UpdateFormUser user={user} />
    </div>
  );
};

export default UpdateUserPage;
