import bcrypt from 'bcrypt';

async function createUser(email, password, isAdmin = false) {
  try {
    // if (!process.env.CREATE_TEST_USERS) {
    //   console.log('not permitted to create account');
    //   return;
    // }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    console.log("hashedPassword:",hashedPassword)


  } catch (error) {
    console.error('Error creating user:', error);
  }
}

createUser('admin@email.com', 'admin410', true);
createUser('user@email.com', 'user410', false); 

