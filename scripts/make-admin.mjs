// Promotes a member to ADMIN + APPROVED status directly in Firestore.
// Usage:
//   node --env-file=.env scripts/make-admin.mjs someone@example.com
// (Node 20.6+ supports --env-file. On older Node, export the FIREBASE_* and
// pass the email as: FIREBASE_PROJECT_ID=... FIREBASE_CLIENT_EMAIL=... \
//   FIREBASE_PRIVATE_KEY=... node scripts/make-admin.mjs someone@example.com)

import { cert, getApps, initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

const email = process.argv[2];
if (!email) {
  console.error('Usage: node --env-file=.env scripts/make-admin.mjs <email>');
  process.exit(1);
}

const projectId = process.env.FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');

if (!projectId || !clientEmail || !privateKey) {
  console.error('Missing FIREBASE_PROJECT_ID / FIREBASE_CLIENT_EMAIL / FIREBASE_PRIVATE_KEY env vars.');
  process.exit(1);
}

const app = getApps().length ? getApps()[0] : initializeApp({ credential: cert({ projectId, clientEmail, privateKey }) });
const db = getFirestore(app);

const snap = await db.collection('users').where('email', '==', email.trim().toLowerCase()).limit(1).get();
if (snap.empty) {
  console.error(`No user found with email ${email}. Register at /membership first.`);
  process.exit(1);
}

const doc = snap.docs[0];
await doc.ref.update({ role: 'ADMIN', status: 'APPROVED', updatedAt: new Date().toISOString() });

console.log(`✅ ${doc.data().name} (${email}) is now an ADMIN with APPROVED status.`);
console.log('Sign out and sign back in at /login so the session picks up the new role.');
process.exit(0);
