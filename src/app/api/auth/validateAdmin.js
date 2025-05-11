import jwt from 'jsonwebtoken';

export function validateAdmin(req) {
  try {
    const cookies = req.headers.get('cookie') || '';
    const authToken = cookies
      .split('; ')
      .find((cookie) => cookie.startsWith('authToken='))
      ?.split('=')[1];

    if (!authToken) {
      return new Response(
        JSON.stringify({ message: 'Unauthorized' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Verify the JWT
    const decoded = jwt.verify(authToken, process.env.JWT_SECRET);

    if (!decoded.isAdmin) {
      return new Response(
        JSON.stringify({ message: 'Forbidden: Admins only' }),
        { status: 403, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Pass user info to the route
    return decoded; // Decoded token contains user info (id, email, isAdmin)
  } catch (error) {
    console.error('Token validation error:', error);
    return new Response(
      JSON.stringify({ message: 'Invalid or expired token' }),
      { status: 401, headers: { 'Content-Type': 'application/json' } }
    );
  }
}