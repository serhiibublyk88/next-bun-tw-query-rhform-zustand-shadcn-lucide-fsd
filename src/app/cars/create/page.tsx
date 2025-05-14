// src/app/cars/create/page.tsx

import type { Metadata } from 'next';
import { CarForm } from '@/features/manage-car';

export const metadata: Metadata = {
  title: 'Auto hinzufügen',
};

export default function CreateCarPage() {
  return (
    <div className="mt-8 max-w-3xl mx-auto px-4">
      <h1 className="text-2xl font-bold mb-4">Neues Auto hinzufügen</h1>
      <CarForm />
    </div>
  );
}
