// shared/types/car.ts

export type VehicleType =
  | 'Unselected'
  | 'Cabrio/Roadster'
  | 'Kleinwagen'
  | 'Limousine'
  | 'Van/Minibus'
  | 'Geländewagen/Pickup/SUV'
  | 'Kombi'
  | 'Sportwagen/Coupe'
  | 'Andere';

export type Condition =
  | 'Unselected'
  | 'Neu'
  | 'Gebraucht'
  | 'Jahreswagen'
  | 'Oldtimer'
  | 'Vorführfahrzeug';

export type FuelType =
  | 'Unselected'
  | 'Benzin'
  | 'Diesel'
  | 'Elektro'
  | 'Ethanol'
  | 'Hybrid (Diesel/Elektro)'
  | 'Hybrid (Benzin/Elektro)'
  | 'Plug-in-Hybrid'
  | 'Wasserstoff'
  | 'Autogas (LPG)'
  | 'Erdgas (CNG)'
  | 'Andere';

export type Drivetrain = 'Unselected' | 'Frontantrieb' | 'Heckantrieb' | 'Allrad';

export type Transmission = 'Unselected' | 'Automatik' | 'Halbautomatik' | 'Schaltgetriebe';

export type CarBase = {
  make: string;
  model: string;
  vehicleType: VehicleType;
  seats: number;
  doors: number;
  condition: Condition;
  price: number;
  firstRegistration: string;
  mileage: number;
  fuelType: FuelType;
  power: number;
  engineCapacity: number;
  drivetrain: Drivetrain;
  transmission: Transmission;
  vin: string;
  accidentFree: boolean;
  description: string;
  image: string;
};

export type Car = CarBase & { id: string };
export type CarFormValues = CarBase;
