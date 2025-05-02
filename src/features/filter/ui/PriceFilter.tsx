'use client';

import { Label } from '@/shared/ui/label';
import { Slider } from '@/shared/ui/slider';
import { useFilterStore } from '../model/useFilterStore';

export const PriceFilter = () => {
  const { minPrice, setMinPrice } = useFilterStore();

  return (
    <div className="space-y-2 w-full max-w-md mx-auto px-4">
      <Label htmlFor="price-range">Minimaler Preis: {minPrice} €</Label>
      <Slider
        id="price-range"
        min={0}
        max={100000}
        step={1000}
        value={[minPrice]}
        onValueChange={([value]) => setMinPrice(value)}
      />
    </div>
  );
};
