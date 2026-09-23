# Vadabalija Seva Sangam — Website

A production-ready Next.js website for Vadabalija Seva Sangam (Hyderabad), rebuilt from the original static demo into a full application with:

- Public pages: Home, About, Welfare & Seva, Events, Jobs, Gallery, Contact
- **Real membership registration** (stored in Firebase Firestore, password hashed with bcrypt)
- **Real member login** (NextAuth.js, credentials provider, JWT sessions)
- **Member Directory** — searchable by name/occupation/city, visible only to signed-in, admin-approved members (mirrors the reference "login → search" flow)
- **Admin dashboard** — approve/reject pending members, view all members, view contact form submissions

## Tech stack

- Next.js 14 (App Router) + React 18
- Firebase Firestore (via `firebase-admin`, server-side only)
- NextAuth.js (credentials-based auth, bcrypt password hashing)
- Zod for input validation
- Plain CSS (adapted from the original site's `styles.css` — no framework lock-in)

## 1. Create the Firebase project

1. Go to the [Firebase console](https://console.firebase.google.com/) → **Add project** (you can decline Google Analytics, it isn't needed).
2. In the project, open **Build → Firestore Database → Create database**. Pick a region close to your users (e.g. `asia-south1` for India) and start in **Production mode**.
3. Go to **Project settings (gear icon) → Service accounts → Generate new private key**. This downloads a JSON file — keep it secret, never commit it.
4. From that JSON file you need three values for `.env`:
   - `project_id` → `FIREBASE_PROJECT_ID`
   - `client_email` → `FIREBASE_CLIENT_EMAIL`
   - `private_key` → `FIREBASE_PRIVATE_KEY` (keep the `\n` sequences as-is, wrap the whole value in quotes)

No schema/migration step is needed — Firestore is schemaless; the `users` and `contactMessages` collections are created automatically the first time someone registers or submits the contact form.

### Firestore security rules

The app only ever talks to Firestore from the server (via `firebase-admin`, which bypasses security rules using the service account). Client-side code never touches Firestore directly, so in **Firestore Database → Rules** you can safely lock everything down to deny all direct client access:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

## 2. Local setup

```bash
npm install
cp .env.example .env      # fill in the FIREBASE_* values and NEXTAUTH_SECRET
npm run dev
```

Generate a `NEXTAUTH_SECRET` with: `openssl rand -base64 32`

### Creating the first admin account

There's no public "sign up as admin" flow (by design — admin access shouldn't be self-service). To create your first admin:

1. Register normally at `/membership` with your own details.
2. Run: `node --env-file=.env scripts/make-admin.mjs you@example.com` (or `npm run make-admin -- you@example.com` once your Node version supports `--env-file`, else export the `FIREBASE_*` vars in your shell first).
3. Sign out and sign back in at `/login` so your session picks up the new role.

From then on, you can approve/reject other members from `/admin`. You can also browse/edit documents directly in the **Firestore Database** tab of the Firebase console at any time.

## 3. Deploying (Vercel + Firebase)

1. Push this project to a GitHub repository.
2. Create the Firebase project and Firestore database as described above (once — it's shared by all environments; just keep using the same service account credentials).
3. Import the repo into [Vercel](https://vercel.com/new).
4. In the Vercel project's **Environment Variables**, set:
   - `FIREBASE_PROJECT_ID`
   - `FIREBASE_CLIENT_EMAIL`
   - `FIREBASE_PRIVATE_KEY` (paste it with literal `\n` sequences — Vercel's env editor preserves them; the app unescapes them at runtime)
   - `NEXTAUTH_URL` → your production URL, e.g. `https://vadabalijasevasangam.org`
   - `NEXTAUTH_SECRET`
5. Deploy. Vercel runs `npm install` → `next build` automatically — no build-time database step required.
6. Promote your admin account as described above, using `node --env-file=.env.production scripts/make-admin.mjs you@example.com` with the production credentials (or update the `role`/`status` fields by hand in the Firebase console's Firestore tab).

## 3. Before going live — replace placeholder details

- Phone/email in `src/components/Header.js`, `src/components/Footer.js`, `src/app/contact/page.js`, and `src/app/globals.css`'s referenced content are placeholders (`+91 90000 00000`, `info@vadabalijasevasangam.org`) — replace with the Sangam's real contact details.
- `src/app/events/page.js`, `jobs/page.js`, `gallery/page.js` currently show sample/placeholder listings — wire these to real content (or ask to have them turned into database-backed sections like the member directory, so admins can post updates without a code change).
- Add a real privacy note near membership registration if you plan to publish members' phone numbers in the directory — the current directory shows phone numbers to other **approved, signed-in members only** (not the public), which matches typical community-directory expectations, but confirm this is what your members consent to.

## Notes on data & privacy

- Passwords are hashed with bcrypt and never stored in plain text.
- The member directory API (`/api/members`) only returns members with `status = APPROVED`, and requires an authenticated, approved session — it is not publicly accessible.
- Full addresses are collected at registration (for the Sangam's own records) but are **not** exposed via the directory API — only name, city, occupation and phone are returned.
