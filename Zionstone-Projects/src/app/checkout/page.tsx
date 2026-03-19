'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Check, ChevronRight, MapPin, CreditCard, Truck, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ShippingSelector, DeliveryEstimate } from '@/components/shipping';
import { calculateShipping } from '@/lib/shipping';
import type { ShippingMethod } from '@/types/shipping';

const steps = [
  { id: 'shipping', name: 'Shipping', icon: MapPin },
  { id: 'delivery', name: 'Delivery', icon: Truck },
  { id: 'payment', name: 'Payment', icon: CreditCard },
];

const mockCartItems = [
  { id: '1', name: 'MacBook Pro 14" M3', brand: 'Apple', price: 1999, image: '💻', quantity: 1 },
  { id: '2', name: 'Sony WH-1000XM5', brand: 'Sony', price: 349, image: '🎧', quantity: 1 },
];

const US_STATES = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
  'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
  'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
  'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
  'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY',
];

export default function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState('shipping');
  const [selectedShipping, setSelectedShipping] = useState<ShippingMethod | null>(null);
  const [shippingCalculation, setShippingCalculation] = useState(() => calculateShipping('90210'));
  
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    postalCode: '',
    phone: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
    cardName: '',
  });

  const subtotal = mockCartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingCost = selectedShipping?.price || 0;
  const tax = subtotal * 0.08;
  const total = subtotal + shippingCost + tax;

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleShippingSelect = (method: ShippingMethod) => {
    setSelectedShipping(method);
  };

  const handleCalculateShipping = () => {
    if (formData.postalCode.length === 5) {
      setShippingCalculation(calculateShipping(formData.postalCode));
    }
  };

  const nextStep = () => {
    const currentIndex = steps.findIndex(s => s.id === currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1].id);
    }
  };

  const prevStep = () => {
    const currentIndex = steps.findIndex(s => s.id === currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1].id);
    }
  };

  const currentStepIndex = steps.findIndex(s => s.id === currentStep);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              CircuitCart
            </Link>
            <Link href="/cart" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary">
              <ArrowLeft className="w-4 h-4" />
              Back to cart
            </Link>
          </div>
        </div>
      </header>

      {/* Progress Steps */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-center">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = step.id === currentStep;
              const isCompleted = index < currentStepIndex;
              
              return (
                <div key={step.id} className="flex items-center">
                  <div className={`flex items-center gap-2 ${isActive ? 'text-blue-600' : isCompleted ? 'text-green-600' : 'text-gray-400'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      isActive ? 'bg-blue-600 text-white' : isCompleted ? 'bg-green-600 text-white' : 'bg-gray-200'
                    }`}>
                      {isCompleted ? <Check className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
                    </div>
                    <span className="font-medium hidden sm:block">{step.name}</span>
                  </div>
                  {index < steps.length - 1 && (
                    <ChevronRight className="w-5 h-5 text-gray-300 mx-4" />
                  )}
                </div>
              );
            })}
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-6">
              {/* Shipping Step */}
              {currentStep === 'shipping' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold">Contact Information</h2>
                  <Input
                    type="email"
                    placeholder="Email address"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                  />

                  <h2 className="text-xl font-semibold pt-4">Shipping Address</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      placeholder="First name"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                    />
                    <Input
                      placeholder="Last name"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                    />
                  </div>
                  <Input
                    placeholder="Address"
                    value={formData.address1}
                    onChange={(e) => handleInputChange('address1', e.target.value)}
                  />
                  <Input
                    placeholder="Apartment, suite, etc. (optional)"
                    value={formData.address2}
                    onChange={(e) => handleInputChange('address2', e.target.value)}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      placeholder="City"
                      value={formData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                    />
                    <select
                      className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                      value={formData.state}
                      onChange={(e) => handleInputChange('state', e.target.value)}
                    >
                      <option value="">State</option>
                      {US_STATES.map(state => (
                        <option key={state} value={state}>{state}</option>
                      ))}
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      placeholder="ZIP code"
                      value={formData.postalCode}
                      onChange={(e) => handleInputChange('postalCode', e.target.value.slice(0, 5))}
                      maxLength={5}
                    />
                    <Input
                      placeholder="Phone (optional)"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                    />
                  </div>

                  <div className="pt-4">
                    <Button onClick={handleCalculateShipping} variant="outline">
                      Calculate Shipping
                    </Button>
                  </div>
                </div>
              )}

              {/* Delivery Step */}
              {currentStep === 'delivery' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold">Delivery Method</h2>
                  <p className="text-sm text-muted-foreground">
                    Shipping to {formData.city || 'your location'}, {formData.state || ''} {formData.postalCode}
                  </p>

                  <ShippingSelector
                    methods={shippingCalculation.methods}
                    estimatedDeliveryDates={shippingCalculation.estimatedDeliveryDates}
                    selectedMethodId={selectedShipping?.id || ''}
                    onSelect={handleShippingSelect}
                  />

                  {selectedShipping && shippingCalculation.estimatedDeliveryDates[selectedShipping.id] && (
                    <DeliveryEstimate
                      estimatedDelivery={shippingCalculation.estimatedDeliveryDates[selectedShipping.id]}
                      shippingMethodName={selectedShipping.name}
                    />
                  )}
                </div>
              )}

              {/* Payment Step */}
              {currentStep === 'payment' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold">Payment Method</h2>
                  
                  <div className="p-4 border rounded-lg bg-gray-50">
                    <div className="flex items-center gap-3 mb-4">
                      <input type="radio" name="payment" defaultChecked className="w-4 h-4" />
                      <span className="font-medium">Credit or Debit Card</span>
                      <div className="ml-auto flex gap-1">
                        <span className="text-2xl">💳</span>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <Input
                        placeholder="Card number"
                        value={formData.cardNumber}
                        onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                      />
                      <Input
                        placeholder="Name on card"
                        value={formData.cardName}
                        onChange={(e) => handleInputChange('cardName', e.target.value)}
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <Input
                          placeholder="MM / YY"
                          value={formData.cardExpiry}
                          onChange={(e) => handleInputChange('cardExpiry', e.target.value)}
                        />
                        <Input
                          placeholder="CVC"
                          value={formData.cardCvc}
                          onChange={(e) => handleInputChange('cardCvc', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <input type="radio" name="payment" className="w-4 h-4" />
                      <span className="font-medium">PayPal</span>
                      <span className="text-2xl ml-2">🅿️</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6 mt-6 border-t">
                {currentStepIndex > 0 ? (
                  <Button variant="outline" onClick={prevStep}>
                    Back
                  </Button>
                ) : (
                  <Link href="/cart">
                    <Button variant="outline">Back</Button>
                  </Link>
                )}
                
                {currentStepIndex < steps.length - 1 ? (
                  <Button onClick={nextStep}>
                    Continue
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <Button className="bg-green-600 hover:bg-green-700">
                    Place Order
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-4">
              <h3 className="font-semibold text-lg mb-4">Order Summary</h3>
              
              <div className="space-y-4 mb-6">
                {mockCartItems.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center text-2xl relative">
                      {item.image}
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-gray-500 text-white text-xs rounded-full flex items-center justify-center">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium line-clamp-1">{item.name}</p>
                      <p className="text-xs text-muted-foreground">{item.brand}</p>
                    </div>
                    <p className="text-sm font-medium">${item.price}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-3 border-t pt-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>{selectedShipping ? `$${selectedShipping.price.toFixed(2)}` : '--'}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tax (8%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-semibold text-lg border-t pt-3">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              {selectedShipping && shippingCalculation.estimatedDeliveryDates[selectedShipping.id] && (
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-700">
                    <span className="font-medium">Estimated Delivery:</span>{' '}
                    {shippingCalculation.estimatedDeliveryDates[selectedShipping.id].toLocaleDateString('en-US', {
                      weekday: 'long',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
