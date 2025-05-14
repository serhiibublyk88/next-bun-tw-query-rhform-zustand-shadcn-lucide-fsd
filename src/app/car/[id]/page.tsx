'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Save } from 'lucide-react';

import type {
  Car,
  CarFormValues,
  VehicleType,
  Condition,
  FuelType,
  Drivetrain,
  Transmission,
} from '@/shared/types/car';
import { carApi } from '@/shared/api';
import { formatPrice } from '@/shared/lib';
import {
  Button,
  Card,
  Input,
  Textarea,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui';

export default function CarPage() {
  const { id } = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [car, setCar] = useState<Car | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [form, setForm] = useState<Partial<CarFormValues>>({});

  useEffect(() => {
    setIsEditMode(searchParams.get('edit') === '1');
  }, [searchParams]);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const data = await carApi.getById(id as string);
        setCar(data);
        setForm(data);
      } catch {
        router.replace('/not-found');
      }
    };

    fetchCar();
  }, [id, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = e.target as HTMLInputElement | HTMLTextAreaElement;
    const { name, value } = target;

    if (target instanceof HTMLInputElement && target.type === 'checkbox') {
      setForm((prev) => ({ ...prev, [name]: target.checked }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: ['price', 'seats', 'doors', 'power', 'engineCapacity', 'mileage'].includes(name)
          ? Number(value)
          : value,
      }));
    }
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
            src={form.image || car.image}
            alt={car.model}
            fill
            sizes="(max-width: 768px) 100vw, 600px"
            className="object-cover rounded"
            priority
          />
        </div>

        {isEditMode ? (
          <div className="space-y-4">
            <Input
              name="make"
              placeholder="Marke"
              value={form.make ?? ''}
              onChange={handleChange}
            />
            <Input
              name="model"
              placeholder="Modell"
              value={form.model ?? ''}
              onChange={handleChange}
            />
            <Input
              name="price"
              type="number"
              placeholder="Preis"
              value={form.price ?? 0}
              onChange={handleChange}
            />
            <Input
              name="image"
              placeholder="Bild URL"
              value={form.image ?? ''}
              onChange={handleChange}
            />
            <Input
              name="firstRegistration"
              placeholder="YYYY-MM"
              value={form.firstRegistration ?? ''}
              onChange={handleChange}
            />
            <Input name="vin" placeholder="VIN" value={form.vin ?? ''} onChange={handleChange} />
            <Input
              name="seats"
              type="number"
              placeholder="Sitze"
              value={form.seats ?? 0}
              onChange={handleChange}
            />
            <Input
              name="doors"
              type="number"
              placeholder="Türen"
              value={form.doors ?? 0}
              onChange={handleChange}
            />
            <Input
              name="power"
              type="number"
              placeholder="Leistung (PS)"
              value={form.power ?? 0}
              onChange={handleChange}
            />
            <Input
              name="engineCapacity"
              type="number"
              placeholder="Hubraum (ccm)"
              value={form.engineCapacity ?? 0}
              onChange={handleChange}
            />
            <Input
              name="mileage"
              type="number"
              placeholder="Kilometerstand"
              value={form.mileage ?? 0}
              onChange={handleChange}
            />

            <Select
              value={form.vehicleType ?? 'Unselected'}
              onValueChange={(value) =>
                setForm((prev) => ({ ...prev, vehicleType: value as VehicleType }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Fahrzeugtyp" />
              </SelectTrigger>
              <SelectContent>
                {[
                  'Unselected',
                  'Cabrio/Roadster',
                  'Kleinwagen',
                  'Limousine',
                  'Van/Minibus',
                  'Geländewagen/Pickup/SUV',
                  'Kombi',
                  'Sportwagen/Coupe',
                  'Andere',
                ].map((v) => (
                  <SelectItem key={v} value={v}>
                    {v}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={form.condition ?? 'Unselected'}
              onValueChange={(value) =>
                setForm((prev) => ({ ...prev, condition: value as Condition }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Zustand" />
              </SelectTrigger>
              <SelectContent>
                {[
                  'Unselected',
                  'Neu',
                  'Gebraucht',
                  'Jahreswagen',
                  'Oldtimer',
                  'Vorführfahrzeug',
                ].map((v) => (
                  <SelectItem key={v} value={v}>
                    {v}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={form.fuelType ?? 'Unselected'}
              onValueChange={(value) =>
                setForm((prev) => ({ ...prev, fuelType: value as FuelType }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Kraftstoffart" />
              </SelectTrigger>
              <SelectContent>
                {[
                  'Unselected',
                  'Benzin',
                  'Diesel',
                  'Elektro',
                  'Ethanol',
                  'Hybrid (Diesel/Elektro)',
                  'Hybrid (Benzin/Elektro)',
                  'Plug-in-Hybrid',
                  'Wasserstoff',
                  'Autogas (LPG)',
                  'Erdgas (CNG)',
                  'Andere',
                ].map((v) => (
                  <SelectItem key={v} value={v}>
                    {v}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={form.drivetrain ?? 'Unselected'}
              onValueChange={(value) =>
                setForm((prev) => ({ ...prev, drivetrain: value as Drivetrain }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Antriebsart" />
              </SelectTrigger>
              <SelectContent>
                {['Unselected', 'Frontantrieb', 'Heckantrieb', 'Allrad'].map((v) => (
                  <SelectItem key={v} value={v}>
                    {v}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={form.transmission ?? 'Unselected'}
              onValueChange={(value) =>
                setForm((prev) => ({ ...prev, transmission: value as Transmission }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Getriebe" />
              </SelectTrigger>
              <SelectContent>
                {['Unselected', 'Automatik', 'Halbautomatik', 'Schaltgetriebe'].map((v) => (
                  <SelectItem key={v} value={v}>
                    {v}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Textarea
              name="description"
              rows={4}
              placeholder="Beschreibung"
              value={form.description ?? ''}
              onChange={handleChange}
            />

            <Button className="w-full" onClick={handleSave}>
              <Save className="mr-2 h-4 w-4" />
              Speichern
            </Button>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-semibold mb-2">
              {car.make} {car.model}
            </h2>
            <p className="text-lg text-muted-foreground mb-4">{formatPrice(car.price)}</p>
            <p className="text-sm text-foreground">{car.description}</p>
            <p className="text-sm">Baujahr: {car.firstRegistration}</p>
            <p className="text-sm">
              Sitze: {car.seats}, Türen: {car.doors}
            </p>
            <p className="text-sm">Fahrzeugtyp: {car.vehicleType}</p>
            <p className="text-sm">Zustand: {car.condition}</p>
            <p className="text-sm">Kraftstoff: {car.fuelType}</p>
            <p className="text-sm">Antrieb: {car.drivetrain}</p>
            <p className="text-sm">Getriebe: {car.transmission}</p>
            <p className="text-sm">
              Leistung: {car.power} PS, Hubraum: {car.engineCapacity} ccm
            </p>
            <p className="text-sm">Kilometerstand: {car.mileage} km</p>
            <p className="text-sm">VIN: {car.vin}</p>
            <p className="text-sm">Unfallfrei: {car.accidentFree ? 'Ja' : 'Nein'}</p>
          </>
        )}
      </Card>
    </div>
  );
}
