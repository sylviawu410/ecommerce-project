import { validateAdmin } from '../../auth/validateAdmin.js';

export async function GET(req) {
  try {
    const user = validateAdmin(req);

    if (user instanceof Response) {
      // general user/guests or no token
      return new Response(
        JSON.stringify({ isAdmin: false }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    //validation succeeds
    return new Response(
      JSON.stringify({ isAdmin: true }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error validating admin:', error);

    return new Response(
      JSON.stringify({ isAdmin: false }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  }
}