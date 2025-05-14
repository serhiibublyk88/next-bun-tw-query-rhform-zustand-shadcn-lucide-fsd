'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { carSchema } from '@/features/manage-car';
import { useManageCar } from '@/features/manage-car/model/useManageCar';
import { carDataApi } from '@/shared/api';
import type { CarFormValues } from '@/shared/types/car';
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
  Switch,
} from '@/shared/ui';

export const CarForm = () => {
  const router = useRouter();
  const [makes, setMakes] = useState<string[]>([]);
  const [models, setModels] = useState<string[]>([]);

  const { addCar, isPending } = useManageCar();

  const form = useForm<CarFormValues>({
    resolver: zodResolver(carSchema),
    defaultValues: {
      make: '',
      model: '',
      vehicleType: 'Unselected',
      seats: 0,
      doors: 0,
      condition: 'Unselected',
      price: 0,
      firstRegistration: '',
      mileage: 0,
      fuelType: 'Unselected',
      power: 0,
      engineCapacity: 0,
      drivetrain: 'Unselected',
      transmission: 'Unselected',
      vin: '',
      accidentFree: false,
      description: '',
      image: '',
    },
  });

  const selectedMake = form.watch('make');

  useEffect(() => {
    carDataApi.getAllMakes().then(setMakes);
  }, []);

  useEffect(() => {
    if (selectedMake) {
      carDataApi.getModelsByMake(selectedMake).then(setModels);
    } else {
      setModels([]);
    }
  }, [selectedMake]);

  const onSubmit = async (data: CarFormValues) => {
    await addCar(data);
    router.push('/cars');
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="make"
          render={({ field }) => (
            <FormItem>
              <Label>Marke</Label>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Wähle eine Marke" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {makes.map((make) => (
                    <SelectItem key={make} value={make}>
                      {make}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {models.length > 0 && selectedMake !== 'Andere' ? (
          <FormField
            control={form.control}
            name="model"
            render={({ field }) => (
              <FormItem>
                <Label>Modell</Label>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Wähle ein Modell" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {models.map((model) => (
                      <SelectItem key={model} value={model}>
                        {model}
                      </SelectItem>
                    ))}
                    <SelectItem value="Andere">Andere (manuell eingeben)</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        ) : (
          <FormField
            control={form.control}
            name="model"
            render={({ field }) => (
              <FormItem>
                <Label>Modell</Label>
                <FormControl>
                  <Input placeholder="z. B. X5" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="vehicleType"
          render={({ field }) => (
            <FormItem>
              <Label>Fahrzeugtyp</Label>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Typ wählen" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Unselected">Unselected</SelectItem>
                  <SelectItem value="Cabrio/Roadster">Cabrio/Roadster</SelectItem>
                  <SelectItem value="Kleinwagen">Kleinwagen</SelectItem>
                  <SelectItem value="Limousine">Limousine</SelectItem>
                  <SelectItem value="Van/Minibus">Van/Minibus</SelectItem>
                  <SelectItem value="Geländewagen/Pickup/SUV">Geländewagen/Pickup/SUV</SelectItem>
                  <SelectItem value="Kombi">Kombi</SelectItem>
                  <SelectItem value="Sportwagen/Coupe">Sportwagen/Coupe</SelectItem>
                  <SelectItem value="Andere">Andere</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="seats"
          render={({ field }) => (
            <FormItem>
              <Label>Anzahl der Sitzplätze</Label>
              <FormControl>
                <Input
                  type="number"
                  min={2}
                  max={7}
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="doors"
          render={({ field }) => (
            <FormItem>
              <Label>Anzahl der Türen</Label>
              <FormControl>
                <Input
                  type="number"
                  min={2}
                  max={5}
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="condition"
          render={({ field }) => (
            <FormItem>
              <Label>Art und Zustand</Label>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Wähle Zustand" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Unselected">Unselected</SelectItem>
                  <SelectItem value="Neu">Neu</SelectItem>
                  <SelectItem value="Gebraucht">Gebraucht</SelectItem>
                  <SelectItem value="Jahreswagen">Jahreswagen</SelectItem>
                  <SelectItem value="Oldtimer">Oldtimer</SelectItem>
                  <SelectItem value="Vorführfahrzeug">Vorführfahrzeug</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <Label>Preis (€)</Label>
              <FormControl>
                <Input
                  type="number"
                  inputMode="numeric"
                  placeholder="10000"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="firstRegistration"
          render={({ field }) => (
            <FormItem>
              <Label>Erstzulassung (Format: YYYY-MM)</Label>
              <FormControl>
                <Input placeholder="2020-05" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="mileage"
          render={({ field }) => (
            <FormItem>
              <Label>Kilometerstand</Label>
              <FormControl>
                <Input
                  type="number"
                  inputMode="numeric"
                  placeholder="50000"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="fuelType"
          render={({ field }) => (
            <FormItem>
              <Label>Kraftstoffart</Label>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Kraftstoff wählen" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Unselected">Unselected</SelectItem>
                  <SelectItem value="Benzin">Benzin</SelectItem>
                  <SelectItem value="Diesel">Diesel</SelectItem>
                  <SelectItem value="Elektro">Elektro</SelectItem>
                  <SelectItem value="Ethanol">Ethanol</SelectItem>
                  <SelectItem value="Hybrid (Diesel/Elektro)">Hybrid (Diesel/Elektro)</SelectItem>
                  <SelectItem value="Hybrid (Benzin/Elektro)">Hybrid (Benzin/Elektro)</SelectItem>
                  <SelectItem value="Plug-in-Hybrid">Plug-in-Hybrid</SelectItem>
                  <SelectItem value="Wasserstoff">Wasserstoff</SelectItem>
                  <SelectItem value="Autogas (LPG)">Autogas (LPG)</SelectItem>
                  <SelectItem value="Erdgas (CNG)">Erdgas (CNG)</SelectItem>
                  <SelectItem value="Andere">Andere</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="power"
          render={({ field }) => (
            <FormItem>
              <Label>Leistung (PS)</Label>
              <FormControl>
                <Input
                  type="number"
                  inputMode="numeric"
                  placeholder="150"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="engineCapacity"
          render={({ field }) => (
            <FormItem>
              <Label>Hubraum (ccm)</Label>
              <FormControl>
                <Input
                  type="number"
                  inputMode="numeric"
                  placeholder="1998"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="drivetrain"
          render={({ field }) => (
            <FormItem>
              <Label>Antriebsart</Label>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Antriebsart wählen" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Unselected">Unselected</SelectItem>
                  <SelectItem value="Frontantrieb">Frontantrieb</SelectItem>
                  <SelectItem value="Heckantrieb">Heckantrieb</SelectItem>
                  <SelectItem value="Allrad">Allrad</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="transmission"
          render={({ field }) => (
            <FormItem>
              <Label>Getriebe</Label>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Getriebe wählen" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Unselected">Unselected</SelectItem>
                  <SelectItem value="Automatik">Automatik</SelectItem>
                  <SelectItem value="Halbautomatik">Halbautomatik</SelectItem>
                  <SelectItem value="Schaltgetriebe">Schaltgetriebe</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="vin"
          render={({ field }) => (
            <FormItem>
              <Label>Fahrgestellnummer (optional)</Label>
              <FormControl>
                <Input placeholder="VIN..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="accidentFree"
          render={({ field }) => (
            <FormItem>
              <Label>Unfallfrei</Label>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
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
                <Textarea placeholder="Beschreibung..." rows={4} {...field} />
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

        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? 'Speichern...' : 'Auto hinzufügen'}
        </Button>
      </form>
    </Form>
  );
};
