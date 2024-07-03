import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const call_id = searchParams.get('call_id');

  const response = await fetch(`https://2r14owmlna.execute-api.ap-south-1.amazonaws.com/prod/call/get_cleaned_call?call_id=${call_id}`, {
    method: 'GET',
    headers: {
      'x-api-key': 'your-api-key-here',
    },
  });
  const data = await response.json();
  return NextResponse.json(data);
}
