import { NextResponse } from 'next/server';

type Params = {
  call_id: string
}

export async function GET(req: Request, context : {params : Params}) {

  const { call_id } = context.params

  const response = await fetch(`${process.env.HOST_URL}/prod/call/details?call_id=${call_id}`, {
    method: 'GET',
    headers: {
      'x-api-key': 'Qv3aZWfsA14VLfzaL3E5p7PGtV9xd1916wr4KEfg',
    },
  });
  const data = await response.json();
  return NextResponse.json(data);
}
