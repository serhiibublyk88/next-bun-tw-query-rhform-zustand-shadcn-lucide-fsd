'use client';

import { PriceFilter } from '@/features/filter';
import { useCars } from '@/widgets/car-list';
import dynamic from 'next/dynamic';

const CarList = dynamic(() => import('@/widgets/car-list').then((m) => m.CarList), {
  loading: () => <p className="text-center text-muted-foreground">Lade Autos...</p>,
});
const CarFormModal = dynamic(() => import('@/features/manage-car').then((m) => m.CarFormModal));
const LoginModal = dynamic(() => import('@/features/auth').then((m) => m.LoginModal));

export default function HomePage() {
  const { cars, isLoading, isError } = useCars();

  return (
    <div className="container max-w-6xl mx-auto py-10 px-4">
      {/* Центрированный заголовок */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold">Verfügbare Autos</h1>
      </div>

      {/* Центрированный фильтр */}
      <div className="flex justify-center mb-8">
        <PriceFilter />
      </div>

      {/* Состояния загрузки и ошибки */}
      {isLoading && <p className="text-center text-muted-foreground">Lade Autos...</p>}

      {isError && <p className="text-center text-red-500">Fehler beim Laden der Autos.</p>}

      {!isLoading && !isError && cars?.length === 0 && (
        <p className="text-center text-muted-foreground">Keine Autos gefunden.</p>
      )}

      {/* Список машин */}
      {cars && cars.length > 0 && <CarList cars={cars} />}

      {/* Модалки */}
      <CarFormModal />
      <LoginModal />
    </div>
  );
}
