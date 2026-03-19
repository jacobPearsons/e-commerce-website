import Link from "next/link";
import { Zap, Shield, Truck, Headphones, Laptop, Cpu, Smartphone, Gamepad2 } from "lucide-react";
import { ShippingBadge } from "@/components/shipping";

const categories = [
  { name: "Computers & Laptops", slug: "computers-laptops", icon: Laptop, desc: "Desktops, laptops, tablets" },
  { name: "Components", slug: "components", icon: Cpu, desc: "CPUs, GPUs, RAM, storage" },
  { name: "Smartphones", slug: "smartphones", icon: Smartphone, desc: "Phones, tablets, wearables" },
  { name: "Audio & Gaming", slug: "audio-gaming", icon: Headphones, desc: "Headphones, speakers, controllers" },
];

const featuredProducts = [
  { name: "MacBook Pro 14\"", brand: "Apple", price: 1999, originalPrice: 2199, slug: "macbook-pro-14", emoji: "💻", shipsInDays: 2, twoDayEligible: true },
  { name: "NVIDIA RTX 4080", brand: "NVIDIA", price: 1199, originalPrice: 1299, slug: "nvidia-rtx-4080", emoji: "🎮", shipsInDays: 2, twoDayEligible: true },
  { name: "iPhone 15 Pro", brand: "Apple", price: 999, originalPrice: 1099, slug: "iphone-15-pro", emoji: "📱", shipsInDays: 2, twoDayEligible: true },
  { name: "Sony WH-1000XM5", brand: "Sony", price: 349, originalPrice: 399, slug: "sony-wh1000xm5", emoji: "🎧", shipsInDays: 2, twoDayEligible: true },
];

const deals = [
  { name: "Gaming Monitor 4K", price: 599, was: 799, discount: "25% OFF", emoji: "🖥️" },
  { name: "Mechanical Keyboard", price: 89, was: 129, discount: "30% OFF", emoji: "⌨️" },
  { name: "Wireless Mouse", price: 49, was: 79, discount: "38% OFF", emoji: "🖱️" },
];

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-96 h-96 bg-blue-400 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-400 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 py-20 md:py-28 relative">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/20 border border-green-500/30 rounded-full text-green-300 text-sm mb-6">
              <Zap className="w-4 h-4" />
              <span>Free 2-Day Shipping on Eligible Items</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Next-Gen <span className="text-blue-400">Electronics</span> Delivered Fast
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8">
              Premium tech products with verified authenticity. Shop components, gadgets, and more with 2-day delivery on thousands of items.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/products"
                className="inline-flex items-center justify-center rounded-md bg-white text-blue-900 px-8 py-3 text-sm font-semibold hover:bg-blue-50 transition-colors"
              >
                Shop Electronics
              </Link>
              <Link
                href="/products?category=components"
                className="inline-flex items-center justify-center rounded-md border border-white/30 bg-transparent px-8 py-3 text-sm font-medium text-white hover:bg-white/10 transition-colors"
              >
                Browse Components
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Flash Deals Banner */}
      <section className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-3">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-4 text-sm font-medium">
            <span className="animate-pulse">⚡</span>
            <span>Flash Deals: Up to 40% off select electronics today!</span>
            <span className="animate-pulse">⚡</span>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Shop by Category</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            From computer components to smart home devices, find everything you need for your tech setup
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <Link
                  key={category.slug}
                  href={`/products?category=${category.slug}`}
                  className="group relative overflow-hidden rounded-xl bg-white p-6 shadow-md hover:shadow-xl transition-all hover:-translate-y-1"
                >
                  <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
                    <Icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold group-hover:text-blue-600 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">{category.desc}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 2-Day Shipping Featured */}
      <section className="py-12 bg-blue-50 border-y border-blue-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Truck className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="font-semibold">2-Day Shipping</p>
                <p className="text-sm text-muted-foreground">On eligible items</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="font-semibold">Verified Authentic</p>
                <p className="text-sm text-muted-foreground">100% genuine products</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Zap className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="font-semibold">Fast Setup</p>
                <p className="text-sm text-muted-foreground">Same-day processing</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold">Featured Products</h2>
              <p className="text-muted-foreground mt-2">Our most popular electronics with 2-day shipping</p>
            </div>
            <Link href="/products" className="text-blue-600 hover:underline font-medium">
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <Link
                key={product.slug}
                href={`/products/${product.slug}`}
                className="group rounded-xl border bg-card text-card-foreground shadow-sm overflow-hidden hover:shadow-lg transition-all"
              >
                <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 relative flex items-center justify-center">
                  <span className="text-7xl">{product.emoji}</span>
                  <div className="absolute top-3 left-3">
                    <ShippingBadge
                      shipsInDays={product.shipsInDays}
                      twoDayEligible={product.twoDayEligible}
                    />
                  </div>
                  {product.originalPrice > product.price && (
                    <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                      {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <p className="text-xs text-muted-foreground">{product.brand}</p>
                  <h3 className="font-semibold mt-1 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {product.name}
                  </h3>
                  <div className="flex items-baseline gap-2 mt-2">
                    <span className="text-lg font-bold">${product.price}</span>
                    {product.originalPrice > product.price && (
                      <span className="text-sm text-muted-foreground line-through">
                        ${product.originalPrice}
                      </span>
                    )}
                  </div>
                  <button className="mt-3 w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors">
                    Add to Cart
                  </button>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Today's Deals */}
      <section className="py-16 bg-gradient-to-br from-orange-50 to-red-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold flex items-center gap-2">
                <span className="animate-pulse">⚡</span>
                Today&apos;s Deals
              </h2>
              <p className="text-muted-foreground mt-2">Limited time offers - while supplies last</p>
            </div>
            <Link href="/products?sale=true" className="text-orange-600 hover:underline font-medium">
              See All Deals →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {deals.map((deal, i) => (
              <Link
                key={i}
                href={`/products?deal=${i}`}
                className="group bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center text-4xl">
                    {deal.emoji}
                  </div>
                  <div className="flex-1">
                    <div className="inline-block bg-red-500 text-white text-xs font-bold px-2 py-1 rounded mb-2">
                      {deal.discount}
                    </div>
                    <h3 className="font-semibold group-hover:text-orange-600 transition-colors">{deal.name}</h3>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-xl font-bold">${deal.price}</span>
                      <span className="text-sm text-muted-foreground line-through">${deal.was}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose CircuitCart</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: Truck, title: "2-Day Shipping", desc: "Fast delivery on eligible items to your doorstep" },
              { icon: Shield, title: "Authenticity Guaranteed", desc: "100% genuine products from authorized sellers" },
              { icon: Zap, title: "Technical Support", desc: "Expert help for compatibility and setup questions" },
              { icon: Gamepad2, title: "Easy Returns", desc: "30-day hassle-free returns on all purchases" },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="text-center">
                  <div className="w-16 h-16 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-blue-400" />
                  </div>
                  <h3 className="font-semibold text-lg">{item.title}</h3>
                  <p className="text-gray-400 mt-2">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
