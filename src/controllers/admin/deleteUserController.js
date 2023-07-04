const { User } = require('../../db');

const deleteUser = async (userId) => {
  const user = await User.destroy({
    where: {
      userId: userId,
    },
    force: true,
  });
  if (!user) {
    throw new Error('User not found');
  }

  return {
    message: 'The user was deleted by an Admin',
  };
};
module.exports = deleteUser;
