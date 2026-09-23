import { db } from '@/lib/firebaseAdmin';

const usersCol = () => db.collection('users');

function serialize(doc) {
  return { id: doc.id, ...doc.data() };
}

/**
 * Looks up a user by email and/or phone (mirrors the old Prisma "OR" lookup).
 * Runs two simple equality queries and merges the results, so it needs no
 * composite index and works on every Firestore/firebase-admin version.
 */
export async function findUserByEmailOrPhone(email, phone) {
  const found = new Map();

  if (email) {
    const snap = await usersCol().where('email', '==', email).limit(1).get();
    snap.forEach((d) => found.set(d.id, serialize(d)));
  }
  if (phone) {
    const snap = await usersCol().where('phone', '==', phone).limit(1).get();
    snap.forEach((d) => found.set(d.id, serialize(d)));
  }

  return [...found.values()][0] || null;
}

export async function getUserById(id) {
  const doc = await usersCol().doc(id).get();
  return doc.exists ? serialize(doc) : null;
}

export async function createUser(data) {
  const now = new Date().toISOString();
  const ref = await usersCol().add({ ...data, createdAt: now, updatedAt: now });
  return { id: ref.id, ...data, createdAt: now, updatedAt: now };
}

/**
 * Approved members for the public directory. Firestore has no case-insensitive
 * "contains" query, so this fetches all approved members and filters in
 * memory — fine at community-directory scale (hundreds/low thousands).
 */
export async function listApprovedMembers({ q = '', city = '' } = {}) {
  const snap = await usersCol().where('status', '==', 'APPROVED').get();
  let members = snap.docs.map(serialize);

  if (q) {
    const needle = q.toLowerCase();
    members = members.filter(
      (m) => m.name?.toLowerCase().includes(needle) || m.occupation?.toLowerCase().includes(needle)
    );
  }
  if (city) {
    const needle = city.toLowerCase();
    members = members.filter((m) => m.city?.toLowerCase().includes(needle));
  }

  members.sort((a, b) => (a.name || '').localeCompare(b.name || ''));

  return members.slice(0, 100).map(({ id, name, city, occupation, phone }) => ({
    id,
    name,
    city,
    occupation,
    phone,
  }));
}

export async function listAllMembers() {
  const snap = await usersCol().orderBy('createdAt', 'desc').get();
  return snap.docs.map((d) => {
    const { passwordHash, ...rest } = serialize(d);
    return rest;
  });
}

export async function updateMemberStatus(id, status) {
  const ref = usersCol().doc(id);
  await ref.update({ status, updatedAt: new Date().toISOString() });
  const doc = await ref.get();
  return { id: doc.id, name: doc.data().name, status: doc.data().status };
}
