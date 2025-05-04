import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';

import { carApi } from '@/shared/api';
import { formatPrice } from '@/shared/lib';
import { Card } from '@/shared/ui';

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const id = (await params)?.id;

  if (!id) return { title: 'Auto nicht gefunden' };

  const car = await carApi.getById(id).catch(() => null);

  return {
    title: car?.name ?? 'Auto nicht gefunden',
    description: car?.description ?? 'Diese Autoseite existiert nicht.',
  };
}

export default async function CarPage({ params }: { params: { id: string } }) {
  const id = (await params)?.id;

  if (!id) notFound();

  const car = await carApi.getById(id).catch(() => null);
  if (!car) notFound();

  return (
    <div className="max-w-2xl mx-auto mt-10 px-4">
      <Card className="p-6">
        <div className="w-full h-64 relative mb-6">
          <Image
            src={car.image}
            alt={car.name}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover rounded"
            priority
          />
        </div>
        <h2 className="text-2xl font-semibold mb-2">{car.name}</h2>
        <p className="text-lg text-muted-foreground mb-4">{formatPrice(car.price)}</p>
        <p className="text-sm text-foreground">{car.description}</p>
      </Card>
    </div>
  );
}
