'use client';

import * as React from "react";
import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { ShoppingCart, Menu, X, Heart, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart-context";
import { useWishlist } from "@/lib/wishlist-context";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const { totalItems } = useCart();
  const { totalItems: wishlistCount } = useWishlist();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl">🎸</span>
              <span className="hidden sm:inline-block font-bold text-lg text-purple-600">SoundCart</span>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/products" className="text-sm font-medium hover:text-purple-600 transition-colors">
                Products
              </Link>
              <Link href="/products?category=guitars-basses" className="text-sm font-medium hover:text-purple-600 transition-colors">
                Guitars
              </Link>
              <Link href="/products?category=keyboards-synths" className="text-sm font-medium hover:text-purple-600 transition-colors">
                Keys & Synths
              </Link>
              <Link href="/products?category=recording-gear" className="text-sm font-medium hover:text-purple-600 transition-colors">
                Recording
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-2">
            {/* Wishlist */}
            <Link href="/dashboard?tab=wishlist" className="relative hidden sm:block">
              <Button variant="ghost" size="icon">
                <Heart className="h-5 w-5" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-pink-500 text-xs text-white flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Button>
            </Link>

            {/* Cart */}
            <Link href="/cart" className="relative">
              <Button variant="ghost" size="icon">
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-purple-600 text-xs text-white flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Button>
            </Link>

            {/* User Menu */}
            <SignedIn>
              <Link href="/dashboard">
                <Button variant="ghost" size="sm" className="hidden sm:flex gap-2">
                  <User className="h-4 w-4" />
                  Dashboard
                </Button>
              </Link>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
            <SignedOut>
              <div className="hidden sm:flex items-center gap-2">
                <Link href="/sign-in">
                  <Button variant="ghost" size="sm">Sign In</Button>
                </Link>
                <Link href="/sign-up">
                  <Button size="sm" className="bg-purple-600 hover:bg-purple-700">Sign Up</Button>
                </Link>
              </div>
            </SignedOut>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {mobileMenuOpen && (
          <nav className="md:hidden border-t py-4">
            <div className="flex flex-col gap-4">
              <Link href="/products" className="text-sm font-medium">Products</Link>
              <Link href="/products?category=guitars-basses" className="text-sm font-medium">Guitars</Link>
              <Link href="/products?category=keyboards-synths" className="text-sm font-medium">Keys & Synths</Link>
              <Link href="/products?category=recording-gear" className="text-sm font-medium">Recording</Link>
              <div className="border-t pt-4">
                <SignedOut>
                  <Link href="/sign-in" className="text-sm font-medium">Sign In</Link>
                </SignedOut>
                <SignedIn>
                  <Link href="/dashboard" className="text-sm font-medium">Dashboard</Link>
                  <Link href="/dashboard?tab=wishlist" className="text-sm font-medium flex items-center gap-2">
                    <Heart className="h-4 w-4" /> Wishlist
                  </Link>
                </SignedIn>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
