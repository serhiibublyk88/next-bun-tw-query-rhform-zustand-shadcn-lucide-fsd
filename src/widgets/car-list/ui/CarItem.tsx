'use client';

import Image from 'next/image';
import { formatPrice, truncateText } from '@/shared/lib';
import { useAppStore } from '@/shared/store';
import { Car } from '@/shared/types';
import { Button, Card } from '@/shared/ui';

interface CarItemProps {
  car: Car;
}

export const CarItem = ({ car }: CarItemProps) => {
  const { openAddCarModal } = useAppStore();

  return (
    <Card className="overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-200">
      <Image
        src={car.image}
        alt={car.name}
        width={400}
        height={250}
        className="w-full h-56 object-cover"
      />

      <div className="p-4 space-y-2">
        <h2 className="text-xl font-semibold">{car.name}</h2>
        <p className="text-muted-foreground text-sm">{truncateText(car.description ?? '', 100)}</p>
        <div className="flex items-center justify-between">
          <span className="font-bold">{formatPrice(car.price)}</span>
          <Button onClick={openAddCarModal} variant="secondary">
            Read more
          </Button>
        </div>
      </div>
    </Card>
  );
};
