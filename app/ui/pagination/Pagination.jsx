import { ArrowLongLeftIcon, ArrowLongRightIcon } from '@heroicons/react/20/solid';

function Pagination({ currentPage, totalCount, pageSize, onPageChange }) {
  const pageCount = Math.ceil(totalCount / pageSize);
  // Determine the range of pages to show
  const startPage = Math.max(1, currentPage - 2);
  const endPage = Math.min(pageCount, startPage + 4); // Show 5 pages at most
  const pages = Array.from({ length: (endPage - startPage + 1) }, (_, i) => startPage + i);

  return (
    <nav className="flex items-center justify-between border-b border-[var(--dark-yellow)] px-4 py-3 mb-3 sm:px-0 antialiased">
      {/* Show previous button only if current page is not the first page */}
      {currentPage > 1 && (
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); onPageChange(currentPage - 1); }}
          className="inline-flex items-center border-b-2 border-transparent pr-1 pt-4 text-sm font-medium text-poke-white hover:border-[var(--poke-blue)] hover:text-[var(--poke-yellow)]"
        >
          <ArrowLongLeftIcon className="mr-3 h-5 w-5 text-poke-white" aria-hidden="true" />
          Previous
        </a>
      )}

      {/* Map through the pages array to display page links */}
      {pages.map(page => (
        <a
          key={page}
          href="#"
          onClick={(e) => { e.preventDefault(); onPageChange(page); }}
          className={`inline-flex items-center border-b-2 border-transparent px-4 pt-4 text-sm font-medium ${currentPage === page ? 'text-poke-red border-[var(--poke-red)]' : 'text-poke-white hover:border-[var(--poke-blue)] hover:text-[var(--poke-yellow)]'}`}
        >
          {page}
        </a>
      ))}

      {/* Show next button only if current page is not the last page */}
      {currentPage < pageCount && (
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); onPageChange(currentPage + 1); }}
          className="inline-flex items-center border-b-2 border-transparent pl-1 pt-4 text-sm font-medium text-poke-white hover:border-[var(--poke-blue)] hover:text-[var(--poke-yellow)]"
        >
          Next
          <ArrowLongRightIcon className="ml-3 h-5 w-5 text-gray-400" aria-hidden="true" />
        </a>
      )}
    </nav>
  );
}

export default Pagination;
