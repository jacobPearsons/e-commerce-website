'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useUser, UserButton } from '@clerk/nextjs';
import { 
  User, Package, Heart, MapPin, CreditCard, Settings, 
  ChevronRight, Truck, Clock, CheckCircle, XCircle, Music
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const orders = [
  { id: 'ORD-2026-001', date: 'Mar 15, 2026', status: 'delivered', total: 1249.00, items: 2 },
  { id: 'ORD-2026-002', date: 'Mar 18, 2026', status: 'shipped', total: 849.00, items: 1 },
  { id: 'ORD-2026-003', date: 'Mar 19, 2026', status: 'processing', total: 399.00, items: 1 },
];

const wishlist = [
  { id: '1', name: 'Moog Subsequent 37', brand: 'Moog', price: 1599, emoji: '🎹' },
  { id: '2', name: 'Universal Audio Apollo Twin X', brand: 'Universal Audio', price: 1299, emoji: '🎤' },
];

const addresses = [
  { id: '1', name: 'Home', address: '123 Music Lane, Los Angeles, CA 90210', default: true },
  { id: '2', name: 'Studio', address: '456 Sound Ave, Hollywood, CA 90028', default: false },
];

const tabs = [
  { id: 'orders', name: 'Orders', icon: Package },
  { id: 'wishlist', name: 'Wishlist', icon: Heart },
  { id: 'addresses', name: 'Addresses', icon: MapPin },
  { id: 'settings', name: 'Settings', icon: Settings },
];

export default function DashboardPage() {
  const { user, isLoaded } = useUser();
  const [activeTab, setActiveTab] = useState('orders');

  if (!isLoaded) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Sign in required</h1>
        <p className="text-muted-foreground mb-6">Please sign in to view your dashboard</p>
        <Link href="/sign-in">
          <Button>Sign In</Button>
        </Link>
      </div>
    );
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'shipped': return <Truck className="w-4 h-4 text-blue-600" />;
      case 'processing': return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'cancelled': return <XCircle className="w-4 h-4 text-red-600" />;
      default: return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
            <User className="w-8 h-8 text-purple-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Welcome back, {user.firstName || 'Musician'}!</h1>
            <p className="text-muted-foreground">{user.emailAddresses[0]?.emailAddress}</p>
          </div>
        </div>
        <UserButton afterSignOutUrl="/" />
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Package className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{orders.length}</p>
              <p className="text-sm text-muted-foreground">Total Orders</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center">
              <Heart className="w-5 h-5 text-pink-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{wishlist.length}</p>
              <p className="text-sm text-muted-foreground">Wishlist Items</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Truck className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">1</p>
              <p className="text-sm text-muted-foreground">In Transit</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <MapPin className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{addresses.length}</p>
              <p className="text-sm text-muted-foreground">Saved Addresses</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                activeTab === tab.id 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.name}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-xl border shadow-sm p-6">
        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Order History</h2>
              <Button variant="outline" size="sm">View All</Button>
            </div>
            {orders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Music className="w-6 h-6 text-gray-500" />
                  </div>
                  <div>
                    <p className="font-medium">{order.id}</p>
                    <p className="text-sm text-muted-foreground">{order.date} • {order.items} item{order.items > 1 ? 's' : ''}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="font-semibold">${order.total.toFixed(2)}</p>
                    <div className="flex items-center gap-1 text-sm">
                      {getStatusIcon(order.status)}
                      <span className="capitalize">{order.status}</span>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Wishlist Tab */}
        {activeTab === 'wishlist' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Your Wishlist</h2>
              <Link href="/products">
                <Button variant="outline" size="sm">Browse More</Button>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {wishlist.map((item) => (
                <div key={item.id} className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50">
                  <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center text-3xl">
                    {item.emoji}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground">{item.brand}</p>
                    <p className="font-medium">{item.name}</p>
                    <p className="font-bold text-purple-600">${item.price}</p>
                  </div>
                  <Button size="sm">Add to Cart</Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Addresses Tab */}
        {activeTab === 'addresses' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Saved Addresses</h2>
              <Button variant="outline" size="sm">Add New</Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {addresses.map((addr) => (
                <div key={addr.id} className="p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-4 h-4 text-purple-600" />
                    <span className="font-medium">{addr.name}</span>
                    {addr.default && (
                      <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded">Default</span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{addr.address}</p>
                  <div className="flex gap-2 mt-3">
                    <Button variant="outline" size="sm">Edit</Button>
                    {!addr.default && (
                      <Button variant="ghost" size="sm">Set as Default</Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold">Account Settings</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-medium">Profile Information</h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm text-muted-foreground">First Name</label>
                    <input 
                      type="text" 
                      defaultValue={user.firstName || ''}
                      className="w-full p-2 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">Last Name</label>
                    <input 
                      type="text" 
                      defaultValue={user.lastName || ''}
                      className="w-full p-2 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">Email</label>
                    <input 
                      type="email" 
                      defaultValue={user.emailAddresses[0]?.emailAddress}
                      className="w-full p-2 border rounded-lg"
                      disabled
                    />
                  </div>
                  <Button>Save Changes</Button>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">Notifications</h3>
                <div className="space-y-3">
                  <label className="flex items-center gap-3">
                    <input type="checkbox" defaultChecked className="w-4 h-4" />
                    <span className="text-sm">Order updates via email</span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input type="checkbox" defaultChecked className="w-4 h-4" />
                    <span className="text-sm">Promotions and deals</span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input type="checkbox" className="w-4 h-4" />
                    <span className="text-sm">Price drop alerts</span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input type="checkbox" className="w-4 h-4" />
                    <span className="text-sm">New product announcements</span>
                  </label>
                </div>
                <Button>Save Preferences</Button>
              </div>
            </div>

            <div className="border-t pt-6">
              <h3 className="font-medium text-red-600 mb-3">Danger Zone</h3>
              <Button variant="destructive">Delete Account</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
