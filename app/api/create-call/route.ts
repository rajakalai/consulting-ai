import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const response = await fetch('https://v0t64zw040.execute-api.ap-south-1.amazonaws.com/prod/call', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'Qv3aZWfsA14VLfzaL3E5p7PGtV9xd1916wr4KEfg'
      },
      body: JSON.stringify(body)
    });
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create call' }, { status: 500 });
  }
}