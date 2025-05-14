'use client';

import { useState } from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { useUser } from '@/features/auth';
import { carApi } from '@/shared/api';
import { formatPrice } from '@/shared/lib';
import { Car } from '@/shared/types';
import { Button, Card } from '@/shared/ui';
import { ConfirmDeleteModal } from '@/widgets/confirm-delete-modal';
import { queryClient } from '@/shared/lib/queryClient';

interface CarItemProps {
  car: Car;
}

export const CarItem = ({ car }: CarItemProps) => {
  const user = useUser();
  const isAdmin = user?.role === 'ADMIN';
  const router = useRouter();

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleEditClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    router.push(`/car/${car.id}?edit=1`);
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsConfirmOpen(true);
  };

  const handleDeleteConfirm = async () => {
    setIsDeleting(true);
    try {
      await carApi.delete(car.id);
      queryClient.invalidateQueries({ queryKey: ['cars'] });
    } finally {
      setIsDeleting(false);
      setIsConfirmOpen(false);
    }
  };

  return (
    <>
      <Card className="w-full max-w-lg mx-auto overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-200">
        <div className="aspect-[4/3] relative">
          <Image
            src={car.image ?? '/placeholder.jpg'}
            alt={`${car.make} ${car.model}`}
            fill
            className="object-cover rounded-t"
            sizes="(max-width: 768px) 100vw, 400px"
            priority
          />
        </div>

        <div className="p-4 flex flex-col justify-between h-[230px]">
          <div>
            <div className="flex items-start justify-between mb-2">
              <h2 className="text-xl font-semibold">
                {car.make} {car.model}
              </h2>
              {isAdmin && (
                <div className="flex gap-2">
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={handleEditClick}
                    className="hover:text-primary"
                    title="Bearbeiten"
                  >
                    <Pencil size={16} />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={handleDeleteClick}
                    className="hover:text-red-600"
                    title="Löschen"
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              )}
            </div>

            <p className="text-muted-foreground text-sm leading-relaxed">
              {car.firstRegistration
                ? `${car.firstRegistration.slice(0, 4)} · `
                : 'Jahr unbekannt · '}
              {car.mileage.toLocaleString()} km
              <br />
              {car.fuelType} · {car.transmission}
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
        open={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleDeleteConfirm}
        isLoading={isDeleting}
      />
    </>
  );
};
