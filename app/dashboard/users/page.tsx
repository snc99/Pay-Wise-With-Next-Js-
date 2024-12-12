import Link from "next/link";
import { FaPlus } from "react-icons/fa";
import TableUser from "@/app/components/table/table-user";
import Search from "@/app/components/search/Search";
import { CreateUsers } from "@/app/components/button/button";
import { getUsersPages } from "@/lib/data";
import Pagination from "@/app/components/pagination/pagination";

const UserPage = async ({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) => {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await getUsersPages(query);

  return (
    <div>
      <div className="mr-2 flex justify-end">
        {/* <Link
          href="/dashboard/users/create"
          className="btn items-center hover:text-blue"
        >
          <FaPlus />
          <span className="ml-2">Tambah User</span>
        </Link> */}
        <Search />
        <CreateUsers />
      </div>
      <TableUser query={query} currentPage={currentPage} />
      <div className="mb-4 mt-4 flex justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
};

export default UserPage;
