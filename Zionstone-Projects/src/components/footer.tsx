import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🎵</span>
              <span className="font-bold text-lg">Zionstone</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Your trusted destination for premium musical instruments and professional audio equipment.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Shop</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/products" className="text-muted-foreground hover:text-primary">All Products</Link></li>
              <li><Link href="/categories/guitars-basses" className="text-muted-foreground hover:text-primary">Guitars & Basses</Link></li>
              <li><Link href="/categories/drums-percussion" className="text-muted-foreground hover:text-primary">Drums & Percussion</Link></li>
              <li><Link href="/categories/studio-equipment" className="text-muted-foreground hover:text-primary">Studio Equipment</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Account</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/account" className="text-muted-foreground hover:text-primary">My Account</Link></li>
              <li><Link href="/orders" className="text-muted-foreground hover:text-primary">Order History</Link></li>
              <li><Link href="/wishlist" className="text-muted-foreground hover:text-primary">Wishlist</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li className="text-muted-foreground">support@zionstone.com</li>
              <li className="text-muted-foreground">+1 (555) 123-4567</li>
            </ul>
            <div className="flex gap-4 mt-4">
              <a href="#" className="text-muted-foreground hover:text-primary">Facebook</a>
              <a href="#" className="text-muted-foreground hover:text-primary">Twitter</a>
              <a href="#" className="text-muted-foreground hover:text-primary">Instagram</a>
              <a href="#" className="text-muted-foreground hover:text-primary">YouTube</a>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Zionstone Electro Musical. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
