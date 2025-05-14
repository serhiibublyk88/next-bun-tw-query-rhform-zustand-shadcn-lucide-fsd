import { NextResponse } from 'next/server';

interface CarModel {
  model_name: string;
  model_make_id: string;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const make = searchParams.get('make');

  if (!make) {
    return new NextResponse('Missing make parameter', { status: 400 });
  }

  try {
    const response = await fetch(
      `https://www.carqueryapi.com/api/0.3/?cmd=getModels&make=${make}&sold_in_us=0`,
    );
    const data = await response.json();

    const models =
      (data.Models as CarModel[] | undefined)
        ?.map((model) => model.model_name)
        .filter(Boolean)
        .sort() ?? [];

    return NextResponse.json({ models });
  } catch (error) {
    console.error(`CarQuery models proxy error for make ${make}:`, error);
    return new NextResponse('Failed to fetch models', { status: 500 });
  }
}
