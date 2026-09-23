import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { findUserByEmailOrPhone, createUser } from '@/lib/users';

const schema = z.object({
  name: z.string().min(2, 'Full name is required'),
  phone: z.string().min(10, 'Enter a valid mobile number'),
  email: z.string().email('Enter a valid email').optional().or(z.literal('')),
  city: z.string().optional(),
  occupation: z.string().optional(),
  ageGroup: z.string().optional(),
  address: z.string().optional(),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export async function POST(req) {
  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });
    }
    const data = parsed.data;
    const email = (data.email && data.email.trim().toLowerCase()) || `${data.phone.trim()}@no-email.vbss.local`;
    const phone = data.phone.trim();

    const existing = await findUserByEmailOrPhone(email, phone);
    if (existing) {
      return NextResponse.json({ error: 'A member with this email or mobile number already exists' }, { status: 409 });
    }

    const passwordHash = await bcrypt.hash(data.password, 10);

    const user = await createUser({
      name: data.name.trim(),
      email,
      phone,
      city: data.city?.trim() || null,
      occupation: data.occupation?.trim() || null,
      ageGroup: data.ageGroup || null,
      address: data.address?.trim() || null,
      passwordHash,
      role: 'MEMBER',
      status: 'PENDING',
    });

    return NextResponse.json({ ok: true, id: user.id });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Something went wrong, please try again' }, { status: 500 });
  }
}
