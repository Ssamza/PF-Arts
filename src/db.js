require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const { DB_NAME, DB_PORT, DB_USER, DB_PASSWORD, DB_HOST, DB_DEPLOY } =
  process.env;

// Instantiating Sequelize Toggle for deploy or dev.
const sequelize = new Sequelize(DB_DEPLOY, {
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false // << Opción para evitar el rechazo de conexiones no autorizadas
    }
  },
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});

/* const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
  {
    logging: false, // set to console.log to see the raw SQL queries
    native: false, // lets Sequelize know we can use pg-native for ~30% more speed
  }
); */

const basename = path.basename(__filename);

const modelDefiners = [];

// Reading all files from Models folder, they are required and added to the array modelDefiners.
fs.readdirSync(path.join(__dirname, '/models'))
  .filter(
    (file) =>
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Inject Sequelize to all models
modelDefiners.forEach((model) => model(sequelize));
// Uppercase models name ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// Sequelize has all models in sequelize.models. we can use it destructuring.
const { User, Artwork, Category, Transaction } = sequelize.models;

const createPredefinedCategories = async () => {
  const categoriesCount = await Category.count();
  if (categoriesCount === 0) {
    await Category.bulkCreate([
      { categoryId: 1, name: 'Painting' },
      { categoryId: 2, name: 'Illustration' },
      { categoryId: 3, name: '3D' },
      { categoryId: 4, name: 'Collage' },
      { categoryId: 5, name: 'Pixel Art' },
      { categoryId: 6, name: 'Photography' },
    ]);
  }
};
// Then it can be related.
User.hasMany(Artwork, { foreignKey: 'userId', onDelete: 'CASCADE' });
Artwork.belongsTo(User, { foreignKey: 'userId' });

Artwork.belongsToMany(Category, {
  through: 'artCategory',
});
Category.belongsToMany(Artwork, {
  through: 'artCategory',
});

User.belongsToMany(Artwork, {
  through: 'favorites',
  as: 'userFav',
});
Artwork.belongsToMany(User, {
  through: 'favorites',
  as: 'favArtwork',
});

User.belongsToMany(Artwork, {
  through: 'review',
  as: 'reviews',
});
Artwork.belongsToMany(User, {
  through: 'review',
  as: 'reviews',
});

User.hasMany(Transaction, { foreignKey: 'userId' });
Transaction.belongsTo(User, { foreignKey: 'userId' });

Artwork.belongsToMany(Transaction, {
  through: 'ArtworkTransaction',
});
Transaction.belongsToMany(Artwork, {
  through: 'ArtworkTransaction',
});

module.exports = {
  ...sequelize.models, // To import models like: const { Product, User } = require('./db.js');
  conn: sequelize,
  createPredefinedCategories, // To import connection { conn } = require('./db.js');
};
