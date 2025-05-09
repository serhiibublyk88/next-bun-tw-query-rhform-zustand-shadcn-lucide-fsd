import { ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { carApi } from '@/shared/api';
import { formatPrice } from '@/shared/lib';
import { Button, Card } from '@/shared/ui';

type Params = { params: { id: string } };

export async function generateMetadata(props: Promise<Params>): Promise<Metadata> {
  const { params } = await props;
  const car = await carApi.getById(params.id).catch(() => null);

  return {
    title: car?.name ?? 'Auto nicht gefunden',
    description: car?.description ?? 'Diese Autoseite existiert nicht.',
  };
}

export default async function CarPage(props: Promise<Params>) {
  const { params } = await props;
  const car = await carApi.getById(params.id).catch(() => null);
  if (!car) notFound();

  return (
    <div className="max-w-2xl mx-auto mt-10 px-4">
      <Link href="/">
        <Button variant="ghost" className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Zurück
        </Button>
      </Link>

      <Card className="p-6">
        <div className="w-full max-w-xl mx-auto aspect-[4/3] relative mb-6">
          <Image
            src={car.image}
            alt={car.name}
            fill
            sizes="(max-width: 768px) 100vw, 600px"
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
