import * as React from "react";
import { ChevronLeftIcon, ChevronRightIcon, MoreHorizontalIcon } from "lucide-react";

import { cn } from "../../lib/utils";
import { Button } from "../../components/atoms/Button";
import { useMemo } from "react";

function PaginationWrapper({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props}
    />
  );
}

function PaginationContent({ className, ...props }: React.ComponentProps<"ul">) {
  return <ul data-slot="pagination-content" className={cn("flex flex-row items-center gap-1", className)} {...props} />;
}

function PaginationItem({ ...props }: React.ComponentProps<"li">) {
  return <li data-slot="pagination-item" {...props} />;
}

type PaginationLinkProps = {
  isActive?: boolean;
  className?: string;
} & React.ComponentProps<typeof Button>;

function PaginationLink({ className, isActive, size = "icon", ...props }: PaginationLinkProps) {
  return (
    <Button
      aria-current={isActive ? "page" : undefined}
      data-slot="pagination-link"
      data-active={isActive}
      variant={isActive ? "outline" : "ghost"}
      color="deactivated"
      className={cn("aspect-square !px-0", className)}
      {...props}
    />
  );
}

function PaginationPrevious({ className, ...props }: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Go to previous page"
      size="sm"
      className={cn("gap-1 px-2.5 sm:pl-2.5", className)}
      {...props}
    >
      <ChevronLeftIcon />
      <span className="hidden sm:block">Previous</span>
    </PaginationLink>
  );
}

function PaginationNext({ className, color, ...props }: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Go to next page"
      size="sm"
      className={cn("gap-1 px-2.5 sm:pr-2.5", className)}
      color={color}
      {...props}
    >
      <span className="hidden sm:block">Next</span>
      <ChevronRightIcon />
    </PaginationLink>
  );
}

function PaginationEllipsis({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      className={cn("flex size-9 items-center justify-center", className)}
      {...props}
    >
      <MoreHorizontalIcon className="size-4" />
      <span className="sr-only">More pages</span>
    </span>
  );
}

type PaginationProps = {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  pageGroupSize?: number;
  pageSize?: number;
} & Pick<React.ComponentProps<typeof Button>, "color" | "size">;

function Pagination({
  totalPages,
  currentPage,
  onPageChange,
  pageGroupSize = 5,
  color = "deactivated",
  size,
}: PaginationProps) {
  const pageGroup = useMemo(() => {
    const startPage = Math.floor(currentPage / pageGroupSize) * pageGroupSize;

    const endPage = Math.min(startPage + pageGroupSize, totalPages);
    return Array.from({ length: endPage - startPage }, (_, i) => startPage + i);
  }, [totalPages, pageGroupSize, currentPage]);

  const isFirstGroup = useMemo(() => {
    return currentPage <= pageGroupSize;
  }, [currentPage, pageGroupSize]);

  const isLastGroup = useMemo(() => {
    return pageGroup[pageGroup.length] === totalPages - 1;
  }, [totalPages, pageGroup]);

  const handlePageChange = (page: number) => {
    if (page < 0 || page >= totalPages) return;
    onPageChange(page);
  };

  return (
    <PaginationWrapper>
      <PaginationContent>
        <PaginationItem className="mr-2">
          <PaginationPrevious
            size="icon"
            color={color}
            disabled={currentPage === 0}
            onClick={() => handlePageChange(currentPage - 1)}
          />
        </PaginationItem>
        {pageGroup.map(index => (
          <PaginationItem key={index}>
            <PaginationLink
              size="icon"
              color={color}
              isActive={index === currentPage}
              onClick={() => handlePageChange(index)}
            >
              {index + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem className="ml-2">
          <PaginationNext
            size="icon"
            color={color}
            disabled={currentPage >= totalPages - 1}
            onClick={() => handlePageChange(currentPage + 1)}
          />
        </PaginationItem>
      </PaginationContent>
    </PaginationWrapper>
  );
}

export {
  PaginationWrapper,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
  Pagination,
};
