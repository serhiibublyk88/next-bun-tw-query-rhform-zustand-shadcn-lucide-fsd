'use client';

import { Pencil, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { useUser } from '@/features/auth';
import { formatPrice, truncateText } from '@/shared/lib';
import { Car } from '@/shared/types';
import { Button, Card } from '@/shared/ui';
import { ConfirmDeleteModal, useConfirmDelete } from '@/widgets/confirm-delete-modal';

interface CarItemProps {
  car: Car;
}

export const CarItem = ({ car }: CarItemProps) => {
  const user = useUser();
  const isAdmin = user?.role === 'ADMIN';
  const router = useRouter();

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

        <div className="p-4 flex flex-col justify-between h-[230px]">
          <div>
            <div className="flex items-start justify-between mb-2">
              <h2 className="text-xl font-semibold">{car.name}</h2>
              {isAdmin && (
                <div className="flex gap-2">
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => router.push(`/car/${car.id}?edit=1`)}
                    className="hover:text-primary"
                    title="Bearbeiten"
                  >
                    <Pencil size={16} />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => open(car.id)}
                    className="hover:text-red-600"
                    title="Löschen"
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              )}
            </div>

            <p className="text-muted-foreground text-sm min-h-[72px]">
              {truncateText(car.description ?? '', 100)}
            </p>
          </div>

          <div className="flex items-center justify-between mt-4">
            <span className="font-bold">{formatPrice(car.price)}</span>
            <Link href={`/car/${car.id}`}>
              <Button variant="secondary">Mehr erfahren</Button>
            </Link>
          </div>
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
