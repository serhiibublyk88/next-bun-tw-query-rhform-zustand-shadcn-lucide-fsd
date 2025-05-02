import { carApi } from '@/shared/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CarFormData } from './carSchema';

export const useManageCar = () => {
  const queryClient = useQueryClient();

  const addCarMutation = useMutation({
    mutationFn: (data: CarFormData) => carApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cars'] });
    },
  });

  const editCarMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CarFormData> }) =>
      carApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cars'] });
    },
  });

  const deleteCarMutation = useMutation({
    mutationFn: (id: string) => carApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cars'] });
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
