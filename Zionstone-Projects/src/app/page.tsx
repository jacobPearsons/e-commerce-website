import Link from "next/link";
import { Zap, Shield, Truck, Headphones, Guitar, Music, Mic2, Drum } from "lucide-react";
import { ShippingBadge } from "@/components/shipping";
import { AddToCartButton } from "@/components/product";
import { products } from "@/data/products";

const categories = [
  { name: "Guitars & Basses", slug: "guitars-basses", icon: Guitar, desc: "Electric, acoustic, and bass guitars" },
  { name: "Keyboards & Synths", slug: "keyboards-synths", icon: Music, desc: "Pianos, synths, and MIDI controllers" },
  { name: "Recording Gear", slug: "recording-gear", icon: Mic2, desc: "Microphones, interfaces, monitors" },
  { name: "Drums & Percussion", slug: "drums-percussion", icon: Drum, desc: "Electronic drums, cymbals, and accessories" },
];

const featuredProducts = products.slice(0, 4);

const deals = products.filter(p => p.originalPrice).slice(0, 3);

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-900 via-indigo-900 to-black text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-96 h-96 bg-purple-400 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-pink-400 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 py-20 md:py-28 relative">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/20 border border-green-500/30 rounded-full text-green-300 text-sm mb-6">
              <Zap className="w-4 h-4" />
              <span>Free 2-Day Shipping on Eligible Instruments</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Power Your <span className="text-purple-400">Sound</span> with Premium Gear
            </h1>
            <p className="text-xl md:text-2xl text-purple-100 mb-8">
              From vintage guitars to cutting-edge synthesizers. Shop instruments, recording equipment, and pro audio with 2-day delivery on thousands of items.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/products"
                className="inline-flex items-center justify-center rounded-md bg-white text-purple-900 px-8 py-3 text-sm font-semibold hover:bg-purple-50 transition-colors"
              >
                Shop Instruments
              </Link>
              <Link
                href="/products?category=recording-gear"
                className="inline-flex items-center justify-center rounded-md border border-white/30 bg-transparent px-8 py-3 text-sm font-medium text-white hover:bg-white/10 transition-colors"
              >
                Studio Equipment
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Flash Deals Banner */}
      <section className="bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-4 text-sm font-medium">
            <span className="animate-pulse">🎵</span>
            <span>Limited Deals: Up to 40% off select gear today!</span>
            <span className="animate-pulse">🎵</span>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Shop by Category</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            From electric guitars to studio monitors, find everything you need to create your perfect sound
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
                  <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-purple-200 transition-colors">
                    <Icon className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-semibold group-hover:text-purple-600 transition-colors">
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
      <section className="py-12 bg-purple-50 border-y border-purple-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Truck className="w-6 h-6 text-purple-600" />
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
                <p className="text-sm text-muted-foreground">100% genuine gear</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
                <Zap className="w-6 h-6 text-pink-600" />
              </div>
              <div>
                <p className="font-semibold">Expert Support</p>
                <p className="text-sm text-muted-foreground">Music tech specialists</p>
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
              <h2 className="text-3xl font-bold">Featured Gear</h2>
              <p className="text-muted-foreground mt-2">Our most popular instruments and equipment with 2-day shipping</p>
            </div>
            <Link href="/products" className="text-purple-600 hover:underline font-medium">
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <div
                key={product.slug}
                className="group rounded-xl border bg-card text-card-foreground shadow-sm overflow-hidden hover:shadow-lg transition-all"
              >
                <Link href={`/products/${product.slug}`}>
                  <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 relative flex items-center justify-center">
                    <span className="text-7xl">{product.emoji}</span>
                    <div className="absolute top-3 left-3">
                      <ShippingBadge
                        shipsInDays={product.shipsInDays}
                        twoDayEligible={product.twoDayEligible}
                      />
                    </div>
                    {(product.originalPrice ?? 0) > product.price && (
                      <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                        {Math.round((1 - product.price / (product.originalPrice ?? product.price)) * 100)}% OFF
                      </div>
                    )}
                  </div>
                </Link>
                <div className="p-4">
                  <p className="text-xs text-muted-foreground">{product.brand}</p>
                  <Link href={`/products/${product.slug}`}>
                    <h3 className="font-semibold mt-1 line-clamp-2 group-hover:text-purple-600 transition-colors">
                      {product.name}
                    </h3>
                  </Link>
                  <div className="flex items-baseline gap-2 mt-2">
                    <span className="text-lg font-bold">${product.price}</span>
                    {(product.originalPrice ?? 0) > product.price && (
                      <span className="text-sm text-muted-foreground line-through">
                        ${product.originalPrice ?? product.price}
                      </span>
                    )}
                  </div>
                  <AddToCartButton
                    product={{
                      productId: product.slug,
                      name: product.name,
                      price: product.price,
                      image: product.emoji,
                      quantity: 1,
                      slug: product.slug,
                      brand: product.brand,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Today's Deals */}
      <section className="py-16 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold flex items-center gap-2">
                <span className="animate-pulse">⚡</span>
                Today&apos;s Deals
              </h2>
              <p className="text-muted-foreground mt-2">Limited time offers on pro audio and instruments</p>
            </div>
            <Link href="/products?sale=true" className="text-purple-600 hover:underline font-medium">
              See All Deals →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {deals.map((deal) => (
              <div
                key={deal.id}
                className="group bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center text-4xl">
                    {deal.emoji}
                  </div>
                  <div className="flex-1">
                    <div className="inline-block bg-red-500 text-white text-xs font-bold px-2 py-1 rounded mb-2">
                      {deal.originalPrice && `${Math.round((1 - deal.price / deal.originalPrice) * 100)}% OFF`}
                    </div>
                    <h3 className="font-semibold group-hover:text-purple-600 transition-colors">{deal.name}</h3>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-xl font-bold">${deal.price}</span>
                      {deal.originalPrice && deal.originalPrice > deal.price && (
                        <span className="text-sm text-muted-foreground line-through">${deal.originalPrice}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose SoundCart</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: Truck, title: "2-Day Shipping", desc: "Fast delivery on eligible instruments and gear" },
              { icon: Shield, title: "Authenticity Guaranteed", desc: "100% genuine products from authorized dealers" },
              { icon: Zap, title: "Tech Support", desc: "Expert advice on compatibility and setup" },
              { icon: Headphones, title: "Easy Returns", desc: "30-day hassle-free returns on all purchases" },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="text-center">
                  <div className="w-16 h-16 bg-purple-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-purple-400" />
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
