import { useQuery } from '@tanstack/react-query';
import { carApi } from '@/shared/api';
import { Car } from '@/shared/types';

export const useCars = () => {
  const {
    data: cars = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery<Car[], Error>({
    queryKey: ['cars'],
    queryFn: carApi.getAll,
  });

  return {
    cars,
    isLoading,
    isError,
    error,
    refetch,
  };
};
