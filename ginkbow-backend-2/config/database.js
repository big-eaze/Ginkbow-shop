import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite', // SQLite database file
  logging: false, // Disable logging for cleaner output
});

export default sequelize;