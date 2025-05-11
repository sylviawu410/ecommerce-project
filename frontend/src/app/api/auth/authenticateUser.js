async function authenticateUser(email, password) {
    try {
      // Fetch the user from the database
      const [rows] = await pool.execute('SELECT * FROM users WHERE email = ?', [email]);
  
      if (rows.length === 0) {
        console.log('User not found!');
        return false;
      }
  
      const user = rows[0];
  
      // Compare the provided password with the hashed password
      const isMatch = await bcrypt.compare(password, user.password);
  
      if (isMatch) {
        console.log('Authentication successful!');
        return user; // Return user details if needed
      } else {
        console.log('Invalid password!');
        return false;
      }
    } catch (error) {
      console.error('Error during authentication:', error);
      return false;
    }
  }
  
  // Example: Authenticate a user
  (async () => {
    const email = 'admin@example.com';
    const password = 'secureAdminPass';
  
    const user = await authenticateUser(email, password);
    if (user) {
      console.log('Logged in as:', user.is_admin ? 'Admin' : 'User');
    }
  })();