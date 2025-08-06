import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Order = sequelize.define('Order', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
  },
  orderTimeMs: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  totalCostCents: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

export default Order;