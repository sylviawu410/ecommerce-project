import pool from '../../../../lib/db'; 




async function createUser(email, password, isAdmin = false) {
  try {
    // Generate a salt and hash the password
    const saltRounds = 10; // Number of salt rounds 
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Insert the user into the database
    const [result] = await pool.execute(
      'INSERT INTO users (email, password, is_admin) VALUES (?, ?, ?)',
      [email, hashedPassword, isAdmin]
    );

    console.log('User created with ID:', result.insertId);
  } catch (error) {
    console.error('Error creating user:', error);
  }
}

// Example: Creating users
(async () => {
  await createUser('admin@example.com', 'secureAdminPass', true); // Admin user
  await createUser('user@example.com', 'secureUserPass', false); // Normal user
})();