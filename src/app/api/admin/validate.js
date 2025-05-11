import { validateAdmin } from '../../auth/validateAdmin.js';

export async function GET(req) {
  const user = validateAdmin(req);

  if (user instanceof Response) {
    return user;
  }

  // return the admin status
  return new Response(
    JSON.stringify({ isAdmin: true }),
    { status: 200, headers: { 'Content-Type': 'application/json' } }
  );
}