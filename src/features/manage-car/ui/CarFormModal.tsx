'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { useAppStore } from '@/shared/store';
import {
  Button,
  Dialog,
  DialogContent,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Input,
  Label,
} from '@/shared/ui';

import { carSchema, useManageCar, type CarFormData } from '@/features/manage-car';

export const CarFormModal = () => {
  const {
    isAddCarModalOpen,
    closeAddCarModal,
    isEditCarModalOpen,
    closeEditCarModal,
    editableCar,
  } = useAppStore();

  const { addCar, editCar, isPending } = useManageCar();

  const form = useForm<CarFormData>({
    resolver: zodResolver(carSchema),
    defaultValues: {
      name: '',
      price: 0,
      image: '',
      description: '',
    },
  });

  // При открытии модалки редактирования — заполняем поля
  useEffect(() => {
    if (isEditCarModalOpen && editableCar) {
      form.reset({
        name: editableCar.name,
        price: editableCar.price,
        image: editableCar.image,
        description: editableCar.description,
      });
    }
  }, [isEditCarModalOpen, editableCar, form]);

  const isEdit = isEditCarModalOpen && editableCar;

  const handleClose = () => {
    if (isEdit) closeEditCarModal();
    else closeAddCarModal();
    form.reset();
  };

  const onSubmit = async (data: CarFormData) => {
    if (isEdit && editableCar) {
      await editCar({ id: editableCar.id, data });
    } else {
      await addCar(data);
    }
    handleClose();
  };

  return (
    <Dialog open={isAddCarModalOpen || isEditCarModalOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <Label>Name</Label>
                  <FormControl>
                    <Input placeholder="Mercedes Benz" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <Label>Preis</Label>
                  <FormControl>
                    <Input type="number" placeholder="10000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <Label>Bild-URL</Label>
                  <FormControl>
                    <Input placeholder="https://..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <Label>Beschreibung</Label>
                  <FormControl>
                    <Input placeholder="Beschreibung..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? 'Speichern...' : isEdit ? 'Aktualisieren' : 'Hinzufügen'}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
