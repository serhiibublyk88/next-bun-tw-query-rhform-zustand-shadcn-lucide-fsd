'use client';

import { Car } from '@/shared/types';
import { CarItem } from './CarItem';

interface CarListProps {
  cars: Car[];
}

export const CarList = ({ cars }: CarListProps) => {
  if (!cars.length) {
    return <p className="text-center text-muted-foreground">Keine Autos gefunden.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {cars.map((car) => (
        <CarItem key={car.id} car={car} />
      ))}
    </div>
  );
};
