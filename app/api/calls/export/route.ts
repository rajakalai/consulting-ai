import { NextResponse } from 'next/server';

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const call_id = searchParams.get('call_id');
    const response = await fetch(`${process.env.HOST_URL}/prod/call/export_cleaned_call?call_id=${call_id}`, {
    method: 'GET',
    headers: {
      'x-api-key': 'your-api-key-here',
      'Content-Type': 'application/json',
    },
    //body: JSON.stringify({}),
  });
  const data = await response.json();
  return NextResponse.json(data);
}
