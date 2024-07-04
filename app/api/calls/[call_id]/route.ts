import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const call_id = searchParams.get('call_id');

  const response = await fetch(`https://fj7isl6mih.execute-api.ap-south-1.amazonaws.com/prod/call/details?call_id=${call_id}`, {
    method: 'GET',
    headers: {
      'x-api-key': 'Qv3aZWfsA14VLfzaL3E5p7PGtV9xd1916wr4KEfg',
    },
  });
  const data = await response.json();
  return NextResponse.json(data);
}
