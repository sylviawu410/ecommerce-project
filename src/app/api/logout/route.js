export async function POST(req) {
  
  return new Response(
    JSON.stringify({ message: 'Logged out successfully' }),
    {
      status: 200,
      // clear authentication cookie by Max-Age=0
      headers: {
        'Set-Cookie': 'authToken=; HttpOnly; Path=/; Max-Age=0; Secure; SameSite=Strict',
        'Content-Type': 'application/json',
      },
    }
  );
}