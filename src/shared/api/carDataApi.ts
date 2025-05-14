// src/shared/api/carDataApi.ts

import fallbackMakes from '@/shared/data/fallbackCarMakes.json';
import axios from 'axios';

interface MakesResponse {
  makes: string[]; // proxy route returns array of strings
}

interface ModelsResponse {
  models: string[]; // proxy route returns array of strings
}

const BASE_URL = '/api/carquery/';

export const carDataApi = {
  async getAllMakes(): Promise<string[]> {
    try {
      const response = await axios.get<MakesResponse>(`${BASE_URL}makes`);
      const makes = response.data?.makes ?? [];
      return makes.length > 0 ? makes.sort() : fallbackMakes;
    } catch (error) {
      console.error('Internal API getMakes error:', error);
      return fallbackMakes;
    }
  },

  async getModelsByMake(make: string): Promise<string[]> {
    try {
      const response = await axios.get<ModelsResponse>(`${BASE_URL}models`, {
        params: { make },
      });
      const models = response.data?.models ?? [];
      return models.length > 0 ? models.sort() : [];
    } catch (error) {
      console.error(`Internal API getModels error for make ${make}:`, error);
      return [];
    }
  },
};
