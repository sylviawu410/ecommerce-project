import bcrypt from 'bcrypt';
import pool from '../../../../lib/db.js';

export async function POST(req) {
  try {
    const { email, password } = await req.json(); 

    const [rows] = await pool.execute(
      'SELECT userid, email, password, is_admin FROM users WHERE email = ?',
      [email]
    );

    if (rows.length === 0) {
      return new Response(
        JSON.stringify({ message: 'Invalid email or password' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const user = rows[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return new Response(
        JSON.stringify({ message: 'Invalid email or password' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // password matches
    return new Response(
      JSON.stringify({
        message: 'Login successful',
        user: {
          id: user.userid,
          email: user.email,
          isAdmin: user.is_admin,
        },
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error during login:', error);

    return new Response(
      JSON.stringify({ message: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}