import UpdateFormUser from "@/app/components/form/edit-users";
import { getUsersById } from "@/lib/data";
import { notFound } from "next/navigation";

const UpdateUserPage = async ({ params }: { params: { id: string } }) => {
  const id = params.id;
  const user = await getUsersById(id);

  if (!user) {
    notFound();
  }
  return (
    <div className="mx-auto mt-5 max-w-md">
      <h1 className="text-2xl font-bold">Update User</h1>
      <UpdateFormUser user={user} />
    </div>
  );
};

export default UpdateUserPage;
