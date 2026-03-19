'use client';

import { useState } from 'react';
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { ShippingBadge, DeliveryEstimate, ShippingSelector } from '@/components/shipping';
import { calculateShipping } from '@/lib/shipping';
import type { ShippingMethod } from '@/types/shipping';

const product = {
  id: "1",
  name: "Arduino Uno R3 Microcontroller",
  slug: "arduino-uno-r3",
  price: 24.99,
  comparePrice: 29.99,
  category: "Components",
  brand: "Arduino",
  description: "The Arduino Uno R3 is a microcontroller board based on the ATmega328P. It's the perfect board for beginners and professionals alike, with 14 digital input/output pins and 6 analog inputs.",
  features: [
    "ATmega328P microcontroller",
    "14 digital I/O pins (6 PWM outputs)",
    "6 analog inputs",
    "16 MHz crystal oscillator",
    "USB connection for programming",
    "ICSP header for firmware programming"
  ],
  image: "🔌",
  images: ["🔌", "🔌", "🔌", "🔌"],
  inventory: 50,
  shipsInDays: 2,
  twoDayEligible: true,
};

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const [quantity, setQuantity] = useState(1);
  const [selectedShipping, setSelectedShipping] = useState<ShippingMethod | null>(null);
  const [shippingCalculation, setShippingCalculation] = useState(() => calculateShipping('90210'));
  
  const handleShippingChange = (method: ShippingMethod) => {
    setSelectedShipping(method);
  };
  
  const primaryImage = product.images[0];
  
  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/products" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-6">
        <ArrowLeft className="h-4 w-4" />
        Back to Products
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div>
          <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center mb-4 relative">
            {primaryImage ? (
              <span className="text-[200px]">{primaryImage}</span>
            ) : (
              <span className="text-[200px]">🔌</span>
            )}
            <div className="absolute top-4 left-4">
              <ShippingBadge
                shipsInDays={product.shipsInDays}
                twoDayEligible={product.twoDayEligible}
              />
            </div>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {product.images.map((img, i) => (
              <div key={i} className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center cursor-pointer hover:ring-2 hover:ring-primary">
                <span className="text-3xl">{img}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <p className="text-sm text-muted-foreground mb-2">{product.brand}</p>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <span key={star} className="text-yellow-400">★</span>
              ))}
            </div>
            <span className="text-sm text-muted-foreground">(0 reviews)</span>
          </div>

          <div className="flex items-baseline gap-4 mb-6">
            <span className="text-3xl font-bold">${product.price.toFixed(2)}</span>
            {product.comparePrice && (
              <span className="text-xl text-muted-foreground line-through">
                ${product.comparePrice.toFixed(2)}
              </span>
            )}
            {product.comparePrice && (
              <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-sm font-medium">
                Save ${(product.comparePrice - product.price).toFixed(2)}
              </span>
            )}
          </div>

          <p className="text-muted-foreground mb-6">{product.description}</p>

          {/* Shipping Information */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium">Shipping to 90210</h3>
              <button className="text-sm text-primary hover:underline">Change location</button>
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

          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center border rounded-md">
              <button 
                className="px-4 py-2 hover:bg-gray-100"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                -
              </button>
              <input 
                type="number" 
                value={quantity} 
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                min={1} 
                className="w-16 text-center border-x" 
              />
              <button 
                className="px-4 py-2 hover:bg-gray-100"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </button>
            </div>
            <Button size="lg" className="flex-1">Add to Cart</Button>
          </div>

          <Button variant="outline" size="lg" className="w-full mb-8">Add to Wishlist</Button>

          <div className="border rounded-lg p-6">
            <h3 className="font-semibold mb-4">Features</h3>
            <ul className="space-y-2">
              {product.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-primary">✓</span>
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
