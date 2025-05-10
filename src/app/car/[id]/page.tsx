'use client';

import { ArrowLeft, Save } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { carApi } from '@/shared/api';
import { formatPrice } from '@/shared/lib';
import type { Car } from '@/shared/types';
import { Button, Card, Input, Textarea } from '@/shared/ui';

export default function CarPage() {
  const { id } = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [car, setCar] = useState<Car | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [form, setForm] = useState({
    name: '',
    price: 0,
    image: '',
    description: '',
  });

  useEffect(() => {
    setIsEditMode(searchParams.get('edit') === '1');
  }, [searchParams]);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const data = await carApi.getById(id as string);
        setCar(data);
        setForm({
          name: data.name,
          price: data.price,
          image: data.image,
          description: data.description ?? '',
        });
      } catch {
        router.replace('/not-found');
      }
    };

    fetchCar();
  }, [id, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: name === 'price' ? Number(value) : value }));
  };

  const handleSave = async () => {
    if (!car) return;
    try {
      const updated = await carApi.update(car.id, form);
      setCar(updated);

      router.replace(`/car/${car.id}`);
    } catch (error) {
      console.error('Fehler beim Speichern:', error);
    }
  };

  if (!car) return <p className="text-center text-muted-foreground mt-10">Lade Auto...</p>;

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
            src={form.image}
            alt={form.name}
            fill
            sizes="(max-width: 768px) 100vw, 600px"
            className="object-cover rounded"
            priority
          />
        </div>

        {isEditMode ? (
          <div className="space-y-4">
            <Input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
            <Input
              name="price"
              type="number"
              placeholder="Preis"
              value={form.price}
              onChange={handleChange}
            />
            <Input name="image" placeholder="Bild-URL" value={form.image} onChange={handleChange} />
            <Textarea
              name="description"
              placeholder="Beschreibung"
              rows={4}
              value={form.description}
              onChange={handleChange}
            />
            <Button className="w-full" onClick={handleSave}>
              <Save className="mr-2 h-4 w-4" />
              Speichern
            </Button>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-semibold mb-2">{car.name}</h2>
            <p className="text-lg text-muted-foreground mb-4">{formatPrice(car.price)}</p>
            <p className="text-sm text-foreground">{car.description}</p>
          </>
        )}
      </Card>
    </div>
  );
}
