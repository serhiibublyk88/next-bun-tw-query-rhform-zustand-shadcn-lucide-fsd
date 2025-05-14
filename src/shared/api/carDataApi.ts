// src/shared/api/carDataApi.ts

import axios from 'axios';
import fallbackMakes from '@/shared/data/fallbackCarMakes.json';

const BASE_URL = 'https://www.carqueryapi.com/api/0.3/';

interface CarMake {
  make_id: string;
  make_display: string;
  make_is_common: string;
  make_country: string;
}

interface CarModel {
  model_name: string;
  model_make_id: string;
  model_trim: string;
  model_year: number;
}

interface MakesResponse {
  Makes: CarMake[];
}

interface ModelsResponse {
  Models: CarModel[];
}

export const carDataApi = {
  async getAllMakes(): Promise<string[]> {
    try {
      const response = await axios.get<MakesResponse>(BASE_URL, {
        params: { cmd: 'getMakes' },
      });

      const makes = response.data?.Makes?.map((make) => make.make_display) ?? [];
      return makes.length > 0 ? makes.sort() : fallbackMakes;
    } catch (error) {
      console.error('CarQuery API getMakes error:', error);
      return fallbackMakes;
    }
  },

  async getModelsByMake(make: string): Promise<string[]> {
    try {
      const response = await axios.get<ModelsResponse>(BASE_URL, {
        params: { cmd: 'getModels', make },
      });

      const models = response.data?.Models?.map((model) => model.model_name) ?? [];
      return models.length > 0 ? models.sort() : [];
    } catch (error) {
      console.error(`CarQuery API getModels error for make ${make}:`, error);
      return [];
    }
  },
};
