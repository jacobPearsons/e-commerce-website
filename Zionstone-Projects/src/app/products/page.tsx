'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, SlidersHorizontal, Grid3X3, LayoutList, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ShippingBadge } from '@/components/shipping';

const products = [
  { id: "1", name: "MacBook Pro 14\" M3", brand: "Apple", price: 1999, originalPrice: 2199, category: "computers-laptops", slug: "macbook-pro-14", emoji: "💻", shipsInDays: 2, twoDayEligible: true, rating: 4.8, reviews: 1247 },
  { id: "2", name: "NVIDIA RTX 4080 Super", brand: "NVIDIA", price: 999, category: "components", slug: "nvidia-rtx-4080", emoji: "🎮", shipsInDays: 2, twoDayEligible: true, rating: 4.9, reviews: 892 },
  { id: "3", name: "iPhone 15 Pro Max", brand: "Apple", price: 1199, originalPrice: 1299, category: "smartphones", slug: "iphone-15-pro", emoji: "📱", shipsInDays: 2, twoDayEligible: true, rating: 4.7, reviews: 2341 },
  { id: "4", name: "Sony WH-1000XM5", brand: "Sony", price: 349, category: "audio-gaming", slug: "sony-wh1000xm5", emoji: "🎧", shipsInDays: 2, twoDayEligible: true, rating: 4.8, reviews: 1567 },
  { id: "5", name: "Samsung 55\" OLED 4K", brand: "Samsung", price: 1299, category: "tvs-displays", slug: "samsung-oled-55", emoji: "📺", shipsInDays: 3, twoDayEligible: false, rating: 4.6, reviews: 456 },
  { id: "6", name: "AMD Ryzen 9 7950X", brand: "AMD", price: 549, category: "components", slug: "amd-ryzen-9", emoji: "⚡", shipsInDays: 2, twoDayEligible: true, rating: 4.9, reviews: 2134 },
  { id: "7", name: "PlayStation 5", brand: "Sony", price: 499, category: "gaming", slug: "ps5", emoji: "🎮", shipsInDays: 2, twoDayEligible: true, rating: 4.8, reviews: 3421 },
  { id: "8", name: "Mechanical Keyboard RGB", brand: "Corsair", price: 149, originalPrice: 189, category: "accessories", slug: "corsair-k70", emoji: "⌨️", shipsInDays: 2, twoDayEligible: true, rating: 4.5, reviews: 876 },
  { id: "9", name: "Logitech MX Master 3S", brand: "Logitech", price: 99, category: "accessories", slug: "logitech-mx-master", emoji: "🖱️", shipsInDays: 2, twoDayEligible: true, rating: 4.7, reviews: 2341 },
  { id: "10", name: "32GB DDR5 RAM Kit", brand: "G.Skill", price: 129, category: "components", slug: "gskill-ddr5-32gb", emoji: "💾", shipsInDays: 2, twoDayEligible: true, rating: 4.6, reviews: 567 },
  { id: "11", name: "AirPods Pro 2", brand: "Apple", price: 249, category: "audio-gaming", slug: "airpods-pro-2", emoji: "🎧", shipsInDays: 2, twoDayEligible: true, rating: 4.8, reviews: 4521 },
  { id: "12", name: "Samsung 2TB NVMe SSD", brand: "Samsung", price: 179, originalPrice: 199, category: "components", slug: "samsung-980-pro", emoji: "💿", shipsInDays: 2, twoDayEligible: true, rating: 4.9, reviews: 1823 },
];

const categories = [
  { slug: "computers-laptops", name: "Computers & Laptops", count: 45 },
  { slug: "components", name: "Components", count: 128 },
  { slug: "smartphones", name: "Smartphones", count: 67 },
  { slug: "audio-gaming", name: "Audio & Gaming", count: 89 },
  { slug: "tvs-displays", name: "TVs & Displays", count: 34 },
  { slug: "accessories", name: "Accessories", count: 156 },
];

const brands = [
  { name: "Apple", count: 89 },
  { name: "NVIDIA", count: 23 },
  { name: "AMD", count: 45 },
  { name: "Samsung", count: 67 },
  { name: "Sony", count: 78 },
  { name: "Logitech", count: 56 },
];

const priceRanges = [
  { label: "Under $100", min: 0, max: 100 },
  { label: "$100 - $300", min: 100, max: 300 },
  { label: "$300 - $500", min: 300, max: 500 },
  { label: "$500 - $1000", min: 500, max: 1000 },
  { label: "Over $1000", min: 1000, max: Infinity },
];

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState<typeof priceRanges[0] | null>(null);
  const [twoDayOnly, setTwoDayOnly] = useState(false);
  const [sortBy, setSortBy] = useState('default');
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (searchQuery) {
      result = result.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory) {
      result = result.filter(p => p.category === selectedCategory);
    }

    if (selectedBrands.length > 0) {
      result = result.filter(p => selectedBrands.includes(p.brand));
    }

    if (selectedPriceRange) {
      result = result.filter(p => 
        p.price >= selectedPriceRange.min && p.price < selectedPriceRange.max
      );
    }

    if (twoDayOnly) {
      result = result.filter(p => p.twoDayEligible);
    }

    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
    }

    return result;
  }, [searchQuery, selectedCategory, selectedBrands, selectedPriceRange, twoDayOnly, sortBy]);

  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev => 
      prev.includes(brand) 
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    );
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory(null);
    setSelectedBrands([]);
    setSelectedPriceRange(null);
    setTwoDayOnly(false);
  };

  const hasActiveFilters = selectedCategory || selectedBrands.length > 0 || selectedPriceRange || twoDayOnly;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">Products</h1>
          <p className="text-muted-foreground">
            {filteredProducts.length} products {selectedCategory && `in ${categories.find(c => c.slug === selectedCategory)?.name}`}
          </p>
        </div>
        
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search products..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          
          <div className="hidden md:flex items-center gap-2 border rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded ${viewMode === 'grid' ? 'bg-primary text-primary-foreground' : 'hover:bg-gray-100'}`}
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded ${viewMode === 'list' ? 'bg-primary text-primary-foreground' : 'hover:bg-gray-100'}`}
            >
              <LayoutList className="w-4 h-4" />
            </button>
          </div>

          <select 
            className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="default">Default Sort</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>
      </div>

      {/* Mobile Filter Toggle */}
      <button
        onClick={() => setShowFilters(!showFilters)}
        className="md:hidden w-full mb-4 flex items-center justify-center gap-2 py-3 border rounded-lg bg-white"
      >
        <SlidersHorizontal className="w-4 h-4" />
        <span>Filters</span>
        {hasActiveFilters && (
          <span className="w-2 h-2 bg-primary rounded-full" />
        )}
      </button>

      <div className="flex gap-8">
        {/* Filters Sidebar */}
        <aside className={`w-64 flex-shrink-0 ${showFilters ? 'block' : 'hidden'} md:block`}>
          <div className="sticky top-4 space-y-6 bg-white p-4 border rounded-lg">
            {/* 2-Day Shipping Filter */}
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Quick Filters</h3>
              {hasActiveFilters && (
                <button onClick={clearFilters} className="text-xs text-blue-600 hover:underline">
                  Clear all
                </button>
              )}
            </div>
            
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={twoDayOnly}
                onChange={(e) => setTwoDayOnly(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
              />
              <span className="text-sm font-medium flex items-center gap-2">
                <ShippingBadge shipsInDays={2} twoDayEligible={true} />
              </span>
            </label>

            {/* Categories */}
            <div>
              <h3 className="font-semibold mb-3">Categories</h3>
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                    !selectedCategory ? 'bg-blue-50 text-blue-700 font-medium' : 'hover:bg-gray-50'
                  }`}
                >
                  All Products
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.slug}
                    onClick={() => setSelectedCategory(cat.slug)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center justify-between ${
                      selectedCategory === cat.slug ? 'bg-blue-50 text-blue-700 font-medium' : 'hover:bg-gray-50'
                    }`}
                  >
                    <span>{cat.name}</span>
                    <span className="text-muted-foreground">{cat.count}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <h3 className="font-semibold mb-3">Price Range</h3>
              <div className="space-y-2">
                {priceRanges.map((range) => (
                  <button
                    key={range.label}
                    onClick={() => setSelectedPriceRange(selectedPriceRange?.label === range.label ? null : range)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      selectedPriceRange?.label === range.label ? 'bg-blue-50 text-blue-700 font-medium' : 'hover:bg-gray-50'
                    }`}
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Brands */}
            <div>
              <h3 className="font-semibold mb-3">Brands</h3>
              <div className="space-y-2">
                {brands.map((brand) => (
                  <label key={brand.name} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedBrands.includes(brand.name)}
                      onChange={() => toggleBrand(brand.name)}
                      className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
                    />
                    <span className="text-sm flex-1">{brand.name}</span>
                    <span className="text-xs text-muted-foreground">{brand.count}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          {/* Active Filters */}
          {hasActiveFilters && (
            <div className="flex flex-wrap gap-2 mb-6">
              {selectedCategory && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                  {categories.find(c => c.slug === selectedCategory)?.name}
                  <button onClick={() => setSelectedCategory(null)}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {selectedBrands.map(brand => (
                <span key={brand} className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                  {brand}
                  <button onClick={() => toggleBrand(brand)}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
              {selectedPriceRange && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                  {selectedPriceRange.label}
                  <button onClick={() => setSelectedPriceRange(null)}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {twoDayOnly && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                  2-Day Shipping
                  <button onClick={() => setTwoDayOnly(false)}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
            </div>
          )}

          {filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-lg text-muted-foreground mb-4">No products found matching your criteria</p>
              <Button variant="outline" onClick={clearFilters}>Clear Filters</Button>
            </div>
          ) : (
            <div className={viewMode === 'grid' 
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
              : 'space-y-4'
            }>
              {filteredProducts.map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.slug}`}
                  className={`group rounded-xl border bg-card text-card-foreground shadow-sm overflow-hidden hover:shadow-lg transition-all ${
                    viewMode === 'list' ? 'flex' : ''
                  }`}
                >
                  <div className={`bg-gradient-to-br from-gray-50 to-gray-100 relative flex items-center justify-center ${
                    viewMode === 'grid' ? 'aspect-square' : 'w-48 h-48 flex-shrink-0'
                  }`}>
                    <span className="text-6xl">{product.emoji}</span>
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
                  <div className="p-4 flex-1">
                    <p className="text-xs text-muted-foreground">{product.brand}</p>
                    <h3 className="font-semibold mt-1 line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-1 mt-2">
                      <span className="text-yellow-400">★</span>
                      <span className="text-sm">{product.rating}</span>
                      <span className="text-xs text-muted-foreground">({product.reviews})</span>
                    </div>
                    <div className="flex items-baseline gap-2 mt-2">
                      <span className="text-lg font-bold">${product.price}</span>
                      {(product.originalPrice ?? 0) > product.price && (
<span className="text-sm text-muted-foreground line-through">
                        ${product.originalPrice ?? product.price}
                      </span>
                      )}
                    </div>
                    <Button className="w-full mt-3" size="sm">Add to Cart</Button>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
