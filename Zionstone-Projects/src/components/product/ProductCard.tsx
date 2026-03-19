import Link from 'next/link';
import Image from 'next/image';
import { ShippingBadge } from '@/components/shipping';
import { Button } from '@/components/ui/button';
import type { Product } from '@/types/product';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const primaryImage = product.images[0];
  
  return (
    <div className="group rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden">
      <Link href={`/products/${product.slug}`}>
        <div className="aspect-[4/3] relative bg-gray-100">
          {primaryImage ? (
            <Image
              src={primaryImage.url}
              alt={primaryImage.alt || product.name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-4xl">
              🔌
            </div>
          )}
          {product.shippingInfo && (
            <div className="absolute top-2 left-2">
              <ShippingBadge
                shipsInDays={product.shippingInfo.shipsInDays}
                twoDayEligible={product.shippingInfo.eligibleForTwoDay}
              />
            </div>
          )}
        </div>
      </Link>
      
      <div className="p-4">
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-semibold group-hover:text-primary transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>
        
        {product.brandId && (
          <p className="text-sm text-muted-foreground mt-1">Brand</p>
        )}
        
        <div className="flex items-center gap-2 mt-2">
          <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
          {product.comparePrice && product.comparePrice > product.price && (
            <span className="text-sm text-muted-foreground line-through">
              ${product.comparePrice.toFixed(2)}
            </span>
          )}
        </div>
        
        <div className="flex items-center gap-2 mt-3">
          {product.inventory > 0 ? (
            <span className="text-xs text-green-600">In Stock</span>
          ) : (
            <span className="text-xs text-red-600">Out of Stock</span>
          )}
        </div>
        
        <Button className="w-full mt-3" disabled={product.inventory === 0}>
          Add to Cart
        </Button>
      </div>
    </div>
  );
}
