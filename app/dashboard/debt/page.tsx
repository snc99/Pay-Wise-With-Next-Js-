import React from "react";
import SearchInTable from "@/app/components/search/SearchInTable";
import TableDebt from "@/app/components/table/tableDebt";
import { CreateDebt } from "@/app/components/button/buttonDebt";
import Pagination from "@/app/components/pagination/pagination";
import { getUsersPages } from "@/lib/dataUser";

const debtPage = async ({
  searchParams,
}: {
  searchParams?: { query?: string; page?: string };
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
        <CreateDebt />
      </div>
      <TableDebt query={query} currentPage={currentPage} />
      <div className="mb-4 mt-4 flex justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
};

export default debtPage;
