// scripts/fetchCarMakes.ts

import axios from 'axios';
import { writeFileSync } from 'fs';
import path from 'path';

const BASE_URL = 'https://www.carqueryapi.com/api/0.3/';

interface CarMake {
  make_id: string;
  make_display: string;
  make_is_common: string;
  make_country: string;
}

interface MakesResponse {
  Makes: CarMake[];
}

async function fetchMakes() {
  try {
    console.log('Fetching car makes from CarQuery API...');

    const response = await axios.get<MakesResponse>(BASE_URL, {
      params: { cmd: 'getMakes' },
    });

    const makes = response.data?.Makes?.map((make) => make.make_display).sort();

    if (makes && makes.length > 0) {
      const outputPath = path.resolve(__dirname, '../src/shared/data/fallbackCarMakes.json');

      writeFileSync(outputPath, JSON.stringify(makes, null, 2), 'utf-8');
      console.log(`✅ Successfully saved ${makes.length} makes to fallbackCarMakes.json`);
    } else {
      console.error('❌ No makes found in response');
    }
  } catch (error) {
    console.error('❌ Error fetching car makes:', error);
  }
}

fetchMakes();
