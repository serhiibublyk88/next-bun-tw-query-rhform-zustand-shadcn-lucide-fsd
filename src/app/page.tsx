'use client';

import { Plus } from 'lucide-react';
import dynamic from 'next/dynamic';

import { useUser } from '@/features/auth';
import { PriceFilter } from '@/features/filter';
import { useAppStore } from '@/shared/store';
import { useCars } from '@/widgets/car-list';

const CarList = dynamic(() => import('@/widgets/car-list').then((m) => m.CarList), {
  loading: () => <p className="text-center text-muted-foreground">Lade Autos...</p>,
});
const CarFormModal = dynamic(() => import('@/features/manage-car').then((m) => m.CarFormModal));
const LoginModal = dynamic(() => import('@/features/auth').then((m) => m.LoginModal));

export default function HomePage() {
  const { cars, isLoading, isError } = useCars();
  const user = useUser();
  const { openAddCarModal } = useAppStore();

  const isAdmin = user?.role === 'ADMIN';

  return (
    <div className="container max-w-6xl mx-auto py-10 px-4">
      {/* Заголовок и плюсик справа */}
      <div className="relative flex justify-center items-center mb-6">
        <h1 className="text-2xl font-bold">Verfügbare Autos</h1>

        {isAdmin && (
          <button
            onClick={openAddCarModal}
            className="absolute right-0 rounded-full border border-input w-8 h-8 flex items-center justify-center 
            hover:bg-accent hover:text-accent-foreground transition"
            title="Auto hinzufügen"
          >
            <Plus className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Фильтр по цене */}
      <div className="flex justify-center mb-8">
        <PriceFilter />
      </div>

      {/* Состояния */}
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
