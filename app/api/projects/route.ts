import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch('https://fj7isl6mih.execute-api.ap-south-1.amazonaws.com/prod/project/list', {
      method: 'POST',
      headers: {
        'x-api-key': 'Qv3aZWfsA14VLfzaL3E5p7PGtV9xd1916wr4KEfg',
      },
      body : JSON.stringify({}),
    });
    const data = await response.json();
    console.log('response', data)
    return NextResponse.json(data.projects); // Return only the projects array
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}