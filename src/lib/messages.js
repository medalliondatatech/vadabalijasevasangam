import { db } from '@/lib/firebaseAdmin';

const messagesCol = () => db.collection('contactMessages');

export async function createContactMessage(data) {
  const now = new Date().toISOString();
  await messagesCol().add({ ...data, createdAt: now });
}

export async function listContactMessages() {
  const snap = await messagesCol().orderBy('createdAt', 'desc').limit(100).get();
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}
