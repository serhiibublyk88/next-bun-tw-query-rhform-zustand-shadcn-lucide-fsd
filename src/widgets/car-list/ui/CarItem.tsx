'use client';

import { Pencil, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { useUser } from '@/features/auth';
import { formatPrice, truncateText } from '@/shared/lib';
import { useAppStore } from '@/shared/store';
import { Car } from '@/shared/types';
import { Button, Card } from '@/shared/ui';
import { ConfirmDeleteModal, useConfirmDelete } from '@/widgets/confirm-delete-modal';

interface CarItemProps {
  car: Car;
}

export const CarItem = ({ car }: CarItemProps) => {
  const user = useUser();
  const isAdmin = user?.role === 'ADMIN';

  const { openEditCarModal } = useAppStore();
  const { isOpen, isLoading, open, close, confirmDelete } = useConfirmDelete();

  const handleDelete = async () => {
    await confirmDelete(car.id);
  };

  return (
    <>
      <Card className="w-full max-w-lg mx-auto overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-200">
        <div className="aspect-[4/3] relative">
          <Image
            src={car.image}
            alt={car.name}
            fill
            className="object-cover rounded-t"
            sizes="(max-width: 768px) 100vw, 400px"
            priority
          />
        </div>

        <div className="p-4 space-y-2">
          <h2 className="text-xl font-semibold">{car.name}</h2>
          <p className="text-muted-foreground text-sm">
            {truncateText(car.description ?? '', 100)}
          </p>

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
              <Button size="icon" variant="destructive" onClick={() => open(car.id)}>
                <Trash2 size={16} />
              </Button>
            </div>
          )}
        </div>
      </Card>

      <ConfirmDeleteModal
        open={isOpen}
        onClose={close}
        onConfirm={handleDelete}
        isLoading={isLoading}
      />
    </>
  );
};
