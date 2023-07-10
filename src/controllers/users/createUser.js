const { User } = require('../../db.js');

const createUser = async (
  userName,
  profilePicture,
  description,
  email,
  password,
  phoneNumber,
  location,
  fb,
  tw,
  ig,
  googleUser,
  verified
) => {
  const allUser = await User.findAll();
  let role = 'user';
  if (
    email === 'santiagoemezeta@gmail.com' ||
    email === 'jhondanielrojasmontoya@gmail.com' ||
    email === 'anabellasimonpietri@gmail.com' ||
    email === 'domirandar@unal.edu.co' ||
    email === 'axelromeo63@gmail.com' ||
    email === 'santygalardi@gmail.com'
  ) {
    role = 'admin';
  }
  const duplicateEmail = await allUser.some(
    (users) => users.email.toLowerCase() === email.toLowerCase()
  );
  if (duplicateEmail) {
    throw Error('An account with this email already exists');
  }
  const duplicateUser = await allUser.some(
    (users) => users.userName.toLowerCase() === userName.toLowerCase()
  );
  if (duplicateUser) {
    throw Error('An account with this username already exists');
  }
  
  const newUser = await User.create({
    userName,
    profilePicture,
    description,
    email,
    password,
    phoneNumber,
    location,
    fb,
    tw,
    ig,
    googleUser,
    verified,
    role,
  });
  return newUser;
};

module.exports = createUser;
