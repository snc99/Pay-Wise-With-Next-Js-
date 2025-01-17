import Link from "next/link";
import { FaPlus } from "react-icons/fa";
import TableUser from "@/app/components/table/table-user";
import SearchInTable from "@/app/components/search/SearchInTable";
import { CreateUsers } from "@/app/components/button/buttonUser";
import { getUsersPages } from "@/lib/dataUser";
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
    <div className="card rounded-md bg-base-200">
      <div className="m-5">
        <SearchInTable />
      </div>
      <div className="mx-5 flex justify-end">
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
