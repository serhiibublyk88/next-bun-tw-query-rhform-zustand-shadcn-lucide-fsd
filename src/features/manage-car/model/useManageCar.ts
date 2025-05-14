// src/features/manage-car/model/useManageCar.ts

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { carApi } from '@/shared/api';
import { QUERY_KEYS } from '@/shared/constants/queryKeys';
import type { Car, CarFormValues } from '@/shared/types/car';

export const useManageCar = () => {
  const queryClient = useQueryClient();

  const addCarMutation = useMutation<Car, Error, CarFormValues>({
    mutationFn: (data) => carApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.cars });
    },
  });

  const editCarMutation = useMutation<Car, Error, { id: string; data: Partial<CarFormValues> }>({
    mutationFn: ({ id, data }) => carApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.cars });
    },
  });

  const deleteCarMutation = useMutation<void, Error, string>({
    mutationFn: (id) => carApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.cars });
    },
  });

  return {
    addCar: addCarMutation.mutateAsync,
    isPending: addCarMutation.isPending,

    editCar: editCarMutation.mutateAsync,
    isEditing: editCarMutation.isPending,

    deleteCar: deleteCarMutation.mutateAsync,
    isDeleting: deleteCarMutation.isPending,
  };
};
