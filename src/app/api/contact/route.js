import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createContactMessage } from '@/lib/messages';

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(5),
});

export async function POST(req) {
  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });
    }
    await createContactMessage(parsed.data);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Something went wrong, please try again' }, { status: 500 });
  }
}
