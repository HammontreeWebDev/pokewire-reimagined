import { ArrowLongLeftIcon, ArrowLongRightIcon } from '@heroicons/react/20/solid'

function Pagination({ currentPage, totalCount, pageSize, onPageChange }) {
  const pageCount = Math.ceil(totalCount / pageSize);
  const pages = Array.from({ length: pageCount }, (_, index) => index + 1);

  return (
    <nav className="flex items-center justify-between border-t border-gray-200 px-4 sm:px-0">
      {currentPage > 1 && (
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); onPageChange(currentPage - 1); }}
          className="inline-flex items-center border-t-2 border-transparent pr-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
        >
          <ArrowLongLeftIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
          Previous
        </a>
      )}
      {/* Page numbers (simplified for brevity, could add ellipsis logic here) */}
      {pages.map(page => (
        <a
          key={page}
          href="#"
          onClick={(e) => { e.preventDefault(); onPageChange(page); }}
          className={`inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium ${currentPage === page ? 'text-indigo-600 border-indigo-500' : 'text-gray-500 hover:border-gray-300 hover:text-gray-700'}`}
        >
          {page}
        </a>
      ))}
      {currentPage < pageCount && (
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); onPageChange(currentPage + 1); }}
          className="inline-flex items-center border-t-2 border-transparent pl-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
        >
          Next
          <ArrowLongRightIcon className="ml-3 h-5 w-5 text-gray-400" aria-hidden="true" />
        </a>
      )}
    </nav>
  );
}

export default Pagination;
