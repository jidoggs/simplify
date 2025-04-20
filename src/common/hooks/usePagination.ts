import { useState } from "react";

interface PaginationOptions {
  initialPage?: number;
  itemsPerPage?: number;
  totalItems?: number;
}

export const usePagination = ({
  initialPage = 1,
  itemsPerPage = 10,
  totalItems = 0,
}: PaginationOptions) => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [currentTotalItems, setCurrentTotalItems] = useState(totalItems);

  const totalPages = Math.ceil(currentTotalItems / itemsPerPage);

  const handlePageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  const handleTotalItems = (count: number) => {
    setCurrentTotalItems(count);
  };

  const currentItemsStart = (currentPage - 1) * itemsPerPage + 1;
  const currentItemsEnd = Math.min(currentPage * itemsPerPage, totalItems);

  return {
    currentPage,
    totalPages,
    itemsPerPage,
    handlePageChange,
    handleTotalItems,
    currentItemsStart,
    currentItemsEnd,
  };
};
