const { DataTypes, UUIDV4 } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define(
    'user',
    {
      userId: {
        type: DataTypes.STRING,
        primaryKey: true,
        defaultValue: UUIDV4,
      },
      profilePicture: {
        type: DataTypes.STRING,
        defaultValue:
          'https://icon-library.com/images/artist-icon/artist-icon-14.jpg',
        allowNull: true,
      },
      userName: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING(140),
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      location: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      fb: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      tw: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      ig: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [8, Infinity],
        },
      },
      googleUser: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      verified: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      role: {
        type: DataTypes.ENUM(['user', 'admin']),
        defaultValue: 'user',
        allowNull: false,
      },
    },
    { timestamps: true }
  );
};
