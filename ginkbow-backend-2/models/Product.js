import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  initialPrice: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  discountPercent: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  rating: {
    type: DataTypes.JSON, // Store the entire rating object (e.g., { star: 40, rank: 3915 })
    allowNull: true,
  },
  type: {
    type: DataTypes.STRING, // Product category/type
    allowNull: false,
  },
  keywords: {
    type: DataTypes.JSON,
    allowNull: false
  },
  categoryKey: {
    type: DataTypes.STRING, // Key of the category the product belongs to
    allowNull: false,
  },
});

export default Product;