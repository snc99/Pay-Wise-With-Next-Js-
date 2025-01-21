import TablePayment from "@/app/components/table/tablePayment";
import SearchInTable from "@/app/components/search/SearchInTable";
import Pagination from "@/app/components/pagination/pagination";
import { CreatePayment } from "@/app/components/button/buttonPayment";
import { getUsersPages } from "@/lib/dataUser";

const PaymentPage = async ({
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
        <CreatePayment />
      </div>
      <TablePayment query={query} currentPage={currentPage} />
      <div className="mb-4 mt-4 flex justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
};

export default PaymentPage;
