"use client";

import Link from "next/link";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { usePathname, useSearchParams } from "next/navigation";
import cslx from "clsx";
import { generatePagination } from "@/lib/util";

const Pagination = ({ totalPages }: { totalPages: number }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currenPage = Number(searchParams.get("page")) || 1;

  const createPageURL = (pageNumber: string | number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const allPage = generatePagination(totalPages, currenPage);

  const PaginationNumber = ({
    page,
    href,
    position,
    isActive,
  }: {
    page: number | string;
    href: string;
    position?: "first" | "last" | "middle" | "single";
    isActive: boolean;
  }) => {
    const className = cslx(
      "flex h-10 w-10 items-center justify-center text-sm border text-gray-700",
      {
        "rounded-l-lg": position === "first" || position === "single",
        "rounded-r-lg": position === "last" || position === "single",
        "z-10 border-blue-300 bg-blue-400 text-white": isActive,
        "hover:bg-blue-300 border-blue-300": !isActive && position !== "middle",
        "text-gray-300 pointer-events-none": position === "middle",
      },
    );
    return isActive && position === "middle" ? (
      <div className={className}>{page}</div>
    ) : (
      <Link href={href} className={className}>
        {page}
      </Link>
    );
  };

  const PaginationArrow = ({
    href,
    direction,
    isDisabled,
  }: {
    href: string;
    direction: "left" | "right";
    isDisabled?: boolean;
  }) => {
    const className = cslx(
      "flex h-10 w-10 items-center justify-center text-sm border",
      {
        "pointer-events-none text-gray-500 bg-gray-300": isDisabled,
        "hover:bg-blue-300": !isDisabled,
        "mr-2 bg-blue-400 rounded-l-lg text-gray-700": direction === "left",
        "ml-2 bg-blue-400 rounded-r-lg text-gray-700": direction === "right",
      },
    );

    const icon =
      direction === "left" ? (
        <HiChevronLeft size={20} />
      ) : (
        <HiChevronRight size={20} />
      );

    return isDisabled ? (
      <div className={className}>{icon}</div>
    ) : (
      <Link href={href} className={className}>
        {icon}
      </Link>
    );
  };
  return (
    <div className="inline-flex">
      <PaginationArrow
        direction="left"
        href={createPageURL(currenPage - 1)}
        isDisabled={currenPage <= 1}
      />

      <div className="flex -space-x-px">
        {allPage.map((page, index) => {
          let position: "first" | "last" | "single" | "middle" | undefined;

          if (index === 0) position = "first";
          if (index === allPage.length - 1) position = "last";
          if (allPage.length === 1) position = "single";
          if (page === "...") position = "middle";

          return (
            <PaginationNumber
              key={index}
              href={createPageURL(page)}
              page={page}
              position={position}
              isActive={currenPage === page}
            />
          );
        })}
      </div>

      <PaginationArrow
        direction="right"
        href={createPageURL(currenPage + 1)}
        isDisabled={currenPage >= totalPages}
      />
    </div>
  );
};

export default Pagination;
