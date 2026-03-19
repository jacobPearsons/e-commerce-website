import type { ShippingMethod, ShippingZone, ShippingCalculation } from '@/types/shipping';

const ZONE_MAP: Record<string, ShippingZone> = {
  '00': 'west-coast',
  '01': 'west-coast',
  '02': 'southwest',
  '03': 'mountain',
  '04': 'mountain',
  '05': 'midwest',
  '06': 'midwest',
  '07': 'midwest',
  '08': 'midwest',
  '09': 'east-coast',
  '10': 'east-coast',
  '11': 'east-coast',
  '12': 'east-coast',
  '13': 'alaska',
  '14': 'hawaii',
};

const TWO_DAY_ELIGIBLE_ZONES: ShippingZone[] = ['west-coast', 'southwest', 'mountain', 'midwest'];

export const SHIPPING_METHODS: ShippingMethod[] = [
  {
    id: 'std',
    name: 'Standard Shipping',
    price: 5.99,
    estimatedDays: 5,
    isTwoDayEligible: false,
  },
  {
    id: 'exp',
    name: 'Express Shipping',
    price: 12.99,
    estimatedDays: 2,
    isTwoDayEligible: true,
  },
  {
    id: 'overn',
    name: 'Overnight Shipping',
    price: 24.99,
    estimatedDays: 1,
    isTwoDayEligible: true,
  },
];

export function getZoneFromZipCode(zipCode: string): ShippingZone {
  const prefix = zipCode.substring(0, 2);
  return ZONE_MAP[prefix] || 'midwest';
}

export function isTwoDayShippingEligible(zipCode: string): boolean {
  const zone = getZoneFromZipCode(zipCode);
  return TWO_DAY_ELIGIBLE_ZONES.includes(zone);
}

function addBusinessDays(date: Date, days: number): Date {
  const result = new Date(date);
  let addedDays = 0;
  
  while (addedDays < days) {
    result.setDate(result.getDate() + 1);
    const dayOfWeek = result.getDay();
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      addedDays++;
    }
  }
  
  return result;
}

export function calculateDeliveryDate(
  shipsInDays: number,
  estimatedDays: number,
  fromZipCode?: string
): Date {
  const today = new Date();
  const cutoffHour = 14;
  
  let shipDate = new Date(today);
  if (today.getHours() < cutoffHour) {
    shipDate.setDate(shipDate.getDate() + shipsInDays);
  } else {
    shipDate.setDate(shipDate.getDate() + shipsInDays + 1);
  }
  
  while (shipDate.getDay() === 0 || shipDate.getDay() === 6) {
    shipDate.setDate(shipDate.getDate() + 1);
  }
  
  return addBusinessDays(shipDate, estimatedDays);
}

export function calculateShipping(
  zipCode: string,
  shipsInDays: number = 2
): ShippingCalculation {
  const isEligible = isTwoDayShippingEligible(zipCode);
  
  const methods = SHIPPING_METHODS.map(method => ({
    ...method,
    isTwoDayEligible: isEligible && method.isTwoDayEligible,
  }));
  
  const estimatedDeliveryDates: Record<string, Date> = {};
  
  for (const method of methods) {
    estimatedDeliveryDates[method.id] = calculateDeliveryDate(shipsInDays, method.estimatedDays);
  }
  
  return {
    zipCode,
    methods,
    estimatedDeliveryDates,
  };
}

export function formatDeliveryDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  });
}

export function getShippingBadgeText(shipsInDays: number, isTwoDayEligible: boolean): string {
  if (isTwoDayEligible && shipsInDays <= 2) {
    return 'Ships in 2 Days';
  }
  return `Ships in ${shipsInDays} Days`;
}
