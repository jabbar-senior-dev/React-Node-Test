import type { Product } from '@/types/Product';

interface ProductMetaProps {
  product: Product;
}

export function ProductMeta({ product }: ProductMetaProps) {
  return (
    <div className="pt-6 border-t space-y-2 text-sm text-muted-foreground">
      <p>Product ID: {product._id.slice(-8).toUpperCase()}</p>
      <p>Category: {product.category}</p>
      {product.createdAt && (
        <p>Added: {new Date(product.createdAt).toLocaleDateString()}</p>
      )}
    </div>
  );
}

