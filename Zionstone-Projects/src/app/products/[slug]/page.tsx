'use client';

import { useState, useEffect } from 'react';
import Link from "next/link";
import { ArrowLeft, Heart, Share2, Truck, Shield, RotateCcw, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ShippingBadge, DeliveryEstimate, ShippingSelector } from '@/components/shipping';
import { AddToCartButton, WishlistButton } from '@/components/product';
import { products, getProductBySlug, getRelatedProducts } from '@/data/products';
import { calculateShipping } from '@/lib/shipping';
import { useRecentlyViewed } from '@/lib/recently-viewed-context';
import type { ShippingMethod } from '@/types/shipping';

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const [quantity, setQuantity] = useState(1);
  const [selectedShipping, setSelectedShipping] = useState<ShippingMethod | null>(null);
  const [shippingCalculation, setShippingCalculation] = useState(() => calculateShipping('90210'));
  const [selectedImage, setSelectedImage] = useState(0);
  const [product, setProduct] = useState(getProductBySlug(params.slug));
  const { items: recentlyViewed, addItem } = useRecentlyViewed();

  useEffect(() => {
    const found = getProductBySlug(params.slug);
    setProduct(found);
    setQuantity(1);
    setSelectedImage(0);
  }, [params.slug]);

  useEffect(() => {
    if (product) {
      addItem(product);
    }
  }, [product, addItem]);

  const handleShippingChange = (method: ShippingMethod) => {
    setSelectedShipping(method);
  };

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <p className="text-muted-foreground mb-6">The product you&apos;re looking for doesn&apos;t exist.</p>
        <Link href="/products">
          <Button>Browse Products</Button>
        </Link>
      </div>
    );
  }

  const relatedProducts = getRelatedProducts(product);
  const images = [product.emoji, product.emoji, product.emoji, product.emoji]; // Placeholder for multiple images

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <Link href="/products" className="inline-flex items-center gap-2 text-muted-foreground hover:text-purple-600 mb-6 transition-colors">
        <ArrowLeft className="h-4 w-4" />
        Back to Products
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div>
          <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl flex items-center justify-center mb-4 relative overflow-hidden">
            <span className="text-[180px]">{images[selectedImage]}</span>
            <div className="absolute top-4 left-4">
              <ShippingBadge
                shipsInDays={product.shipsInDays}
                twoDayEligible={product.twoDayEligible}
              />
            </div>
            {(product.originalPrice ?? 0) > product.price && (
              <div className="absolute top-4 right-4 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-lg">
                {Math.round((1 - product.price / (product.originalPrice ?? product.price)) * 100)}% OFF
              </div>
            )}
          </div>
          
          {/* Thumbnail gallery */}
          <div className="grid grid-cols-4 gap-3">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelectedImage(i)}
                className={`aspect-square bg-gray-100 rounded-lg flex items-center justify-center text-3xl hover:ring-2 hover:ring-purple-500 transition-all ${
                  selectedImage === i ? 'ring-2 ring-purple-500' : ''
                }`}
              >
                {img}
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <p className="text-sm text-purple-600 font-medium mb-2">{product.brand}</p>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{product.name}</h1>
          
          {/* Rating */}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <span 
                  key={star} 
                  className={`text-lg ${star <= Math.round(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                >
                  ★
                </span>
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              {product.rating} ({product.reviews.toLocaleString()} reviews)
            </span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-4 mb-6">
            <span className="text-3xl font-bold text-purple-600">${product.price}</span>
            {product.originalPrice && product.originalPrice > product.price && (
              <>
                <span className="text-xl text-muted-foreground line-through">
                  ${product.originalPrice}
                </span>
                <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-sm font-medium">
                  Save ${(product.originalPrice - product.price).toFixed(2)}
                </span>
              </>
            )}
          </div>

          {/* Description */}
          <p className="text-muted-foreground mb-6 leading-relaxed">
            {product.description}
          </p>

          {/* Stock Status */}
          <div className="flex items-center gap-2 mb-6">
            {product.inventory && product.inventory > 0 ? (
              <>
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-green-600 font-medium">
                  In Stock ({product.inventory} available)
                </span>
              </>
            ) : (
              <>
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span className="text-sm text-red-600 font-medium">Out of Stock</span>
              </>
            )}
          </div>

          {/* Shipping Information */}
          <div className="mb-6 p-5 bg-purple-50 rounded-xl border border-purple-100">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Truck className="w-5 h-5 text-purple-600" />
                <h3 className="font-medium">Shipping to 90210</h3>
              </div>
              <button className="text-sm text-purple-600 hover:underline font-medium">Change location</button>
            </div>
            
            {selectedShipping && shippingCalculation.estimatedDeliveryDates[selectedShipping.id] && (
              <DeliveryEstimate
                estimatedDelivery={shippingCalculation.estimatedDeliveryDates[selectedShipping.id]}
                shippingMethodName={selectedShipping.name}
                className="mb-4"
              />
            )}
            
            <ShippingSelector
              methods={shippingCalculation.methods}
              estimatedDeliveryDates={shippingCalculation.estimatedDeliveryDates}
              selectedMethodId={selectedShipping?.id || ''}
              onSelect={handleShippingChange}
            />
          </div>

          {/* Add to Cart / Wishlist */}
          <div className="flex items-center gap-4 mb-6">
            {/* Quantity Selector */}
            <div className="flex items-center border rounded-lg overflow-hidden">
              <button 
                className="px-4 py-3 hover:bg-gray-100 transition-colors text-lg font-medium"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                −
              </button>
              <input 
                type="number" 
                value={quantity} 
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                min={1} 
                max={product.inventory || 99}
                className="w-16 text-center border-x py-3 font-medium" 
              />
              <button 
                className="px-4 py-3 hover:bg-gray-100 transition-colors text-lg font-medium"
                onClick={() => setQuantity(Math.min(product.inventory || 99, quantity + 1))}
              >
                +
              </button>
            </div>
            
            {/* Add to Cart Button */}
            <AddToCartButton
              product={{
                productId: product.slug,
                name: product.name,
                price: product.price,
                image: product.emoji,
                quantity: quantity,
                slug: product.slug,
                brand: product.brand,
              }}
              className="flex-1"
            />
          </div>

          {/* Wishlist & Share */}
          <div className="flex gap-3 mb-8">
            <WishlistButton
              product={{
                productId: product.slug,
                name: product.name,
                price: product.price,
                image: product.emoji,
                slug: product.slug,
                brand: product.brand,
              }}
              className="flex-1"
              variant="outline"
            />
            <Button variant="outline" size="icon" className="px-3">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-xl">
            <div className="text-center">
              <Shield className="w-6 h-6 mx-auto text-green-600 mb-1" />
              <p className="text-xs text-muted-foreground">Authentic</p>
            </div>
            <div className="text-center">
              <RotateCcw className="w-6 h-6 mx-auto text-blue-600 mb-1" />
              <p className="text-xs text-muted-foreground">30-Day Returns</p>
            </div>
            <div className="text-center">
              <Truck className="w-6 h-6 mx-auto text-purple-600 mb-1" />
              <p className="text-xs text-muted-foreground">2-Day Shipping</p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      {product.features && product.features.length > 0 && (
        <div className="mt-12 bg-white rounded-xl border shadow-sm p-6">
          <h2 className="text-xl font-bold mb-4">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {product.features.map((feature, i) => (
              <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-purple-600 text-sm">✓</span>
                </div>
                <span className="text-sm">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-12">
          <h2 className="text-xl font-bold mb-6">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <Link
                key={relatedProduct.id}
                href={`/products/${relatedProduct.slug}`}
                className="group bg-white rounded-xl border shadow-sm overflow-hidden hover:shadow-lg transition-all"
              >
                <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 relative flex items-center justify-center">
                  <span className="text-5xl">{relatedProduct.emoji}</span>
                  <div className="absolute top-3 left-3">
                    <ShippingBadge
                      shipsInDays={relatedProduct.shipsInDays}
                      twoDayEligible={relatedProduct.twoDayEligible}
                    />
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-xs text-muted-foreground">{relatedProduct.brand}</p>
                  <h3 className="font-semibold line-clamp-2 group-hover:text-purple-600 transition-colors">
                    {relatedProduct.name}
                  </h3>
                  <p className="text-lg font-bold mt-2">${relatedProduct.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Recently Viewed Products */}
      {recentlyViewed.length > 1 && (
        <div className="mt-12">
          <div className="flex items-center gap-2 mb-6">
            <Clock className="w-5 h-5 text-purple-600" />
            <h2 className="text-xl font-bold">Recently Viewed</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
            {recentlyViewed
              .filter(p => p.id !== product.id)
              .slice(0, 6)
              .map((viewedProduct) => (
                <Link
                  key={viewedProduct.id}
                  href={`/products/${viewedProduct.slug}`}
                  className="group bg-white rounded-lg border p-3 hover:shadow-md transition-all"
                >
                  <div className="aspect-square bg-gray-50 rounded-lg flex items-center justify-center mb-2">
                    <span className="text-3xl">{viewedProduct.emoji}</span>
                  </div>
                  <p className="text-xs text-muted-foreground truncate">{viewedProduct.brand}</p>
                  <h3 className="text-sm font-medium line-clamp-2 group-hover:text-purple-600 transition-colors">
                    {viewedProduct.name}
                  </h3>
                  <p className="text-sm font-bold mt-1">${viewedProduct.price}</p>
                </Link>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
