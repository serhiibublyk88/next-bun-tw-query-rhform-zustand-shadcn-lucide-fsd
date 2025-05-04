import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Image from 'next/image';

import { carApi } from '@/shared/api';
import { formatPrice } from '@/shared/lib';
import { Card } from '@/shared/ui';

type Props = {
  params: { id: string };
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { id } = props.params;

  const car = await carApi.getById(id).catch(() => null);

  return {
    title: car?.name ?? 'Auto nicht gefunden',
    description: car?.description ?? 'Diese Autoseite existiert nicht.',
  };
}

export default async function CarPage(props: Props) {
  const { id } = props.params;

  const car = await carApi.getById(id).catch(() => null);
  if (!car) notFound();

  return (
    <div className="max-w-2xl mx-auto mt-10 px-4">
      <Card className="p-6">
        <div className="w-full h-64 relative mb-6">
          <Image src={car.image} alt={car.name} fill className="object-cover rounded" priority />
        </div>
        <h2 className="text-2xl font-semibold mb-2">{car.name}</h2>
        <p className="text-lg text-muted-foreground mb-4">{formatPrice(car.price)}</p>
        <p className="text-sm text-foreground">{car.description}</p>
      </Card>
    </div>
  );
}
