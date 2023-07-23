import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import React from "react";

const Pagination = ({ handlePageChange, currentPage, totalTodos, todosPerPage, indexOfLastTodo, indexOfFirstTodo }) => {
  const totalPages = Math.ceil(totalTodos / todosPerPage); //Math.ceil -> 1.1 as 2
  // Calculate the range of displayed results
  const startRange = indexOfFirstTodo + 1;
  const endRange = indexOfLastTodo <= totalTodos ? indexOfLastTodo : totalTodos;

  return (
    <>
      {totalTodos > todosPerPage && (
        <div className="w-full flex items-center justify-between border-t border-gray-200 py-2 mt-4 ">
          <div className="flex flex-1 justify-between md:hidden">
            <p onClick={() => handlePageChange(currentPage > 1 ? currentPage - 1 : currentPage)} className="cursor-pointer relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-xs font-medium text-gray-900 hover:text-gray-100 hover:bg-gray-700">
              Previous
            </p>
            <p onClick={() => handlePageChange(currentPage < totalPages ? currentPage + 1 : currentPage)} className="cursor-pointer relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-xs font-medium text-gray-900 hover:text-gray-100 hover:bg-gray-700 ">
              Next
            </p>
          </div>
          <div className="hidden md:flex md:flex-1 md:items-center md:justify-between md:flex-col lg:flex-row space-y-2">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">{startRange}</span> to <span className="font-medium">{endRange}</span> of <span className="font-medium">{totalTodos}</span> results
              </p>
            </div>
            <div>
              <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                <p onClick={() => handlePageChange(currentPage > 1 ? currentPage - 1 : currentPage)} className="cursor-pointer relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-200 focus:z-20 focus:outline-offset-0">
                  <span className="sr-only">Previous</span>
                  <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                </p>
                {Array.from({ length: totalPages }, (_, index) => (
                  <p key={index} onClick={() => handlePageChange(index + 1)} className={`cursor-pointer relative z-10 inline-flex items-center ${index + 1 === currentPage ? "bg-gray-700  text-white" : " text-gray-700"} px-4 py-2 text-sm font-semibold focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-700 hover:bg-gray-300 hover:text-white`}>
                    {index + 1}
                  </p>
                ))}
                <p onClick={() => handlePageChange(currentPage < totalPages ? currentPage + 1 : currentPage)} className="cursor-pointer relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-200 focus:z-20 focus:outline-offset-0">
                  <span className="sr-only">Next</span>
                  <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                </p>
              </nav>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Pagination;
