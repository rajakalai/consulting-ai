import { NextResponse } from 'next/server';

export async function POST() {
  const response = await fetch('https://2r14owmlna.execute-api.ap-south-1.amazonaws.com/prod/call/list', {
    method: 'POST',
    headers: {
      'x-api-key': 'your-api-key-here',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({}),
  });
  const data = await response.json();
  return NextResponse.json(data);
}
