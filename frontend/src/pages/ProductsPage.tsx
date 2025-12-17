import { useState, useMemo } from 'react';
import { ShoppingCart } from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import { CategoryFilter } from '../components/products/CategoryFilter';
import { ProductGrid } from '../components/products/ProductGrid';
import { Pagination } from '../components/products/Pagination';
import { Card, CardContent, CardHeader } from '../components/ui/card';
import { Skeleton } from '../components/ui/skeleton';
import { getPageNumbers, getPaginationData, paginateArray } from '@/lib/utils';
import { PRODUCTS_PER_PAGE, CATEGORIES } from '@/utils/constants';

export default function ProductsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { data: allProducts = [], isLoading, error } = useProducts();

  const products = useMemo(() => {
    if (selectedCategory === 'all') return allProducts;
    return allProducts.filter(product => product.category === selectedCategory);
  }, [allProducts, selectedCategory]);

  const { totalPages, startIndex, endIndex, hasNext, hasPrev } = getPaginationData(products.length, currentPage, PRODUCTS_PER_PAGE);
  const currentProducts = paginateArray(products, currentPage, PRODUCTS_PER_PAGE);
  const pageNumbers = getPageNumbers(currentPage, totalPages);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  if (error) {
    return (
      <div className="text-center py-16">
        <ShoppingCart className="h-16 w-16 mx-auto text-destructive mb-4" />
        <h2 className="text-2xl font-bold mb-2">Failed to load products</h2>
        <p className="text-muted-foreground">{error instanceof Error ? error.message : 'An error occurred'}</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-48" />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <Card key={i}><CardHeader><Skeleton className="aspect-video w-full mb-4" /></CardHeader><CardContent><Skeleton className="h-12 w-full" /></CardContent></Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold">Products</h1>
          <p className="text-muted-foreground mt-2">
            Browse our collection of {products.length} amazing products
            {totalPages > 1 && <span className="ml-2 text-sm">(Page {currentPage} of {totalPages})</span>}
          </p>
        </div>
        <CategoryFilter categories={CATEGORIES} selectedCategory={selectedCategory} productCount={products.length} onCategoryChange={handleCategoryChange} />
      </div>
      {products.length === 0 ? (
        <div className="text-center py-16">
          <ShoppingCart className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h2 className="text-2xl font-bold mb-2">No products found</h2>
          <p className="text-muted-foreground">Check back later for new products</p>
        </div>
      ) : (
        <>
          <ProductGrid products={currentProducts} />
          <Pagination currentPage={currentPage} totalPages={totalPages} startIndex={startIndex} endIndex={endIndex} totalItems={products.length} pageNumbers={pageNumbers} hasNext={hasNext} hasPrev={hasPrev} onPageChange={(page, e) => { e?.preventDefault(); setCurrentPage(page); }} onPrevious={(e) => { e.preventDefault(); hasPrev && setCurrentPage(currentPage - 1); }} onNext={(e) => { e.preventDefault(); hasNext && setCurrentPage(currentPage + 1); }} />
        </>
      )}
    </div>
  );
}

