import { url } from 'inspector';
import { NextResponse } from 'next/server';

type Params = {
  call_id :String
}

export async function GET(req: Request, context : { params : Params}) {
  const {call_id} = context.params

  const response = await fetch(`${process.env.HOST_URL}/prod/call/get_cleaned_call?call_id=${call_id}`, {
    method: 'GET',
    headers: {
      'x-api-key': 'your-api-key-here',
    },
  });
  console.log('data', call_id)
  console.log('url', `${process.env.HOST_URL}/prod/call/get_cleaned_call?call_id=${call_id}`)
  const data = await response.json();
  return NextResponse.json(data);
}
