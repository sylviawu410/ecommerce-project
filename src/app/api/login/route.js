import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import pool from '../../../../lib/db.js';

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    const [rows] = await pool.execute(
      'SELECT userid, email, password, is_admin FROM users WHERE email = ?',
      [email]
    );

    if (rows.length === 0 || !rows[0].is_admin) {
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

    const token = jwt.sign(
      { id: user.userid, email: user.email, isAdmin: user.is_admin },
      process.env.JWT_SECRET, 
      { expiresIn: '3d' } 
    );

    // set the authentication token in an httpOnly cookie
    return new Response(
      JSON.stringify({ message: 'Login successful' }),
      {
        status: 200,
        headers: {
          'Set-Cookie': `authToken=${token}; HttpOnly; Path=/; Max-Age=${3 * 24 * 60 * 60}; Secure; SameSite=Strict`,
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('Error during login:', error);
    return new Response(
      JSON.stringify({ message: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}