import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Cart = sequelize.define('Cart', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  productId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1, // Default quantity is 1
  },
  deliveryFee: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0, // Default delivery fee is 0
  },
});

export default Cart;