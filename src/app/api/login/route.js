import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import pool from '../../../../lib/db.js';

export async function POST(req) {
  try {
    const { email, password } = await req.json();
    console.log("email:", email, email.length);


    const [rows] = await pool.execute(
      'SELECT userid, email, password, is_admin FROM users WHERE email = ?',
      [email]
    );

    // console.log('Database Query Result:', rows);
    // console.log('Length of row:', rows.length);

    if (rows.length === 0) {
      console.log('No matching user found.');
      return new Response(
        JSON.stringify({ message: 'Invalid email or password' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const user = rows[0];
    // console.log('Retrieved User:', user);
    const isMatch = await bcrypt.compare(password, user.password);
    // console.log('Password Match:', isMatch);

    if (!isMatch) {
      console.log('Password does not match.');
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
      JSON.stringify({
        message: 'Login successful', user: { id: user.userid, email: user.email, isAdmin: user.is_admin },
        token
      }),
      {
        status: 200,
        headers: {
          'Set-Cookie': `authToken=${token}; HttpOnly; Path=/; Max-Age=${3 * 24 * 60 * 60};  SameSite=Strict`,
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