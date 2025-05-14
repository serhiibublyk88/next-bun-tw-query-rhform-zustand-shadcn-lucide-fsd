import { NextResponse } from 'next/server';

interface CarMake {
  make_id: string;
  make_display: string;
  make_is_common: string;
  make_country: string;
}

export async function GET() {
  try {
    const response = await fetch('https://www.carqueryapi.com/api/0.3/?cmd=getMakes&sold_in_us=0');
    const data = await response.json();

    const makes =
      (data.Makes as CarMake[] | undefined)
        ?.map((make) => make.make_display)
        .filter(Boolean)
        .sort() ?? [];

    return NextResponse.json({ makes });
  } catch (error) {
    console.error('CarQuery makes proxy error:', error);
    return new NextResponse('Failed to fetch makes', { status: 500 });
  }
}
