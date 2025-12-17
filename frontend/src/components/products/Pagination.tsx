import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../ui/button';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  startIndex: number;
  endIndex: number;
  totalItems: number;
  pageNumbers: (number | string)[];
  hasNext: boolean;
  hasPrev: boolean;
  onPageChange: (page: number, e?: React.MouseEvent) => void;
  onPrevious: (e: React.MouseEvent) => void;
  onNext: (e: React.MouseEvent) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  startIndex,
  endIndex,
  totalItems,
  pageNumbers,
  hasNext,
  hasPrev,
  onPageChange,
  onPrevious,
  onNext,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t">
      <div className="text-sm text-muted-foreground">
        Showing {startIndex + 1}-{Math.min(endIndex, totalItems)} of {totalItems} products
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" onClick={onPrevious} disabled={!hasPrev} className="gap-1">
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>
        <div className="hidden sm:flex items-center gap-1">
          {pageNumbers.map((page, index) =>
            page === '...' ? (
              <span key={`ellipsis-${index}`} className="px-2 text-muted-foreground">...</span>
            ) : (
              <Button key={page} variant={currentPage === page ? 'default' : 'outline'} size="sm" onClick={(e) => onPageChange(page as number, e)} className="min-w-[40px]">
                {page}
              </Button>
            )
          )}
        </div>
        <div className="sm:hidden px-3 py-1 text-sm font-medium">{currentPage} / {totalPages}</div>
        <Button variant="outline" size="sm" onClick={onNext} disabled={!hasNext} className="gap-1">
          Next
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

