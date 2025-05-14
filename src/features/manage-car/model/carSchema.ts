// features/manage-car/carSchema.ts

import { z } from 'zod';
import type {
  CarFormValues,
  VehicleType,
  Condition,
  FuelType,
  Drivetrain,
  Transmission,
} from '@/shared/types/car';

export const carSchema = z.object({
  make: z.string().min(1, 'Marke ist erforderlich'),
  model: z.string().min(1, 'Modell ist erforderlich'),
  vehicleType: z.enum([
    'Unselected',
    'Cabrio/Roadster',
    'Kleinwagen',
    'Limousine',
    'Van/Minibus',
    'Geländewagen/Pickup/SUV',
    'Kombi',
    'Sportwagen/Coupe',
    'Andere',
  ] as [VehicleType, ...VehicleType[]]),
  seats: z.number().min(2).max(7),
  doors: z.number().min(2).max(5),
  condition: z.enum([
    'Unselected',
    'Neu',
    'Gebraucht',
    'Jahreswagen',
    'Oldtimer',
    'Vorführfahrzeug',
  ] as [Condition, ...Condition[]]),
  price: z.number().min(0),
  firstRegistration: z.string().regex(/^\d{4}-(0[1-9]|1[0-2])$/, 'Format muss YYYY-MM sein'),
  mileage: z.number().min(0),
  fuelType: z.enum([
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
  ] as [FuelType, ...FuelType[]]),
  power: z.number().min(0),
  engineCapacity: z.number().min(0),
  drivetrain: z.enum(['Unselected', 'Frontantrieb', 'Heckantrieb', 'Allrad'] as [
    Drivetrain,
    ...Drivetrain[],
  ]),
  transmission: z.enum(['Unselected', 'Automatik', 'Halbautomatik', 'Schaltgetriebe'] as [
    Transmission,
    ...Transmission[],
  ]),
  vin: z.string(),
  accidentFree: z.boolean(),
  description: z.string(),
  image: z.string().url('Ungültige Bild-URL'),
});

export type { CarFormValues };
