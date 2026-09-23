import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getUserById, listApprovedMembers } from '@/lib/users';

export async function GET(req) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Sign in required' }, { status: 401 });
  }

  const me = await getUserById(session.user.id);
  if (!me || me.status !== 'APPROVED') {
    return NextResponse.json({ error: 'Your membership is not yet approved' }, { status: 403 });
  }

  const { searchParams } = new URL(req.url);
  const q = searchParams.get('q')?.trim() || '';
  const city = searchParams.get('city')?.trim() || '';

  const members = await listApprovedMembers({ q, city });

  return NextResponse.json({ members });
}
