import { Filter } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import type { Category } from '@/types/Product';

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string;
  productCount: number;
  onCategoryChange: (category: string) => void;
}

export function CategoryFilter({ categories, selectedCategory, productCount, onCategoryChange }: CategoryFilterProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
      <div className="flex items-center gap-2 text-sm font-medium">
        <Filter className="h-4 w-4" />
        <span>Filter by:</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button
            key={category.value}
            variant={selectedCategory === category.value ? 'default' : 'outline'}
            size="sm"
            onClick={() => onCategoryChange(category.value)}
            className="capitalize"
          >
            {category.label}
            {selectedCategory === category.value && (
              <Badge variant="secondary" className="ml-2 px-1.5 py-0 text-xs">
                {productCount}
              </Badge>
            )}
          </Button>
        ))}
      </div>
    </div>
  );
}

