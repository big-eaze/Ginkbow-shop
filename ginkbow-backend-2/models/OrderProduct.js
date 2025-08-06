import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const OrderProduct = sequelize.define('OrderProduct', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  orderId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  productId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  estimatedDeliveryTimeMs: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
});

export default OrderProduct;