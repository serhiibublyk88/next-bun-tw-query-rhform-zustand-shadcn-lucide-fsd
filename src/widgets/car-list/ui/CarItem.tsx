'use client';

import Image from 'next/image';
import Link from 'next/link';

import { formatPrice, truncateText } from '@/shared/lib';
import { useAppStore } from '@/shared/store';
import { useUser } from '@/features/auth';
import { Car } from '@/shared/types';
import { Button, Card } from '@/shared/ui';
import { Pencil, Trash2 } from 'lucide-react';

interface CarItemProps {
  car: Car;
}

export const CarItem = ({ car }: CarItemProps) => {
  const user = useUser();
  const { openEditCarModal } = useAppStore();
  const isAdmin = user?.role === 'ADMIN';

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

        <div className="flex items-center justify-between mt-2">
          <span className="font-bold">{formatPrice(car.price)}</span>
          <Link href={`/car/${car.id}`}>
            <Button variant="secondary">Read more</Button>
          </Link>
        </div>

        {isAdmin && (
          <div className="flex items-center gap-2 mt-4">
            <Button size="icon" variant="outline" onClick={() => openEditCarModal(car)}>
              <Pencil size={16} />
            </Button>
            <Button size="icon" variant="destructive" onClick={() => console.log('TODO: delete')}>
              <Trash2 size={16} />
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
};
